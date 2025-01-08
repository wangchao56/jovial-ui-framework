import type { Key } from '../../tree'
import type { RangeOptions, UpDataFuncType, VirtualOptions } from './props'

enum CALC_TYPE {
  INIT = 'init',
  FIXED = 'fixed',
  DYNAMIC = 'dynamic',
}
export function initVirtual(param: VirtualOptions, update: UpDataFuncType) {
  let offsetValue = 0
  let calcType = CALC_TYPE.INIT
  let fixedSizeValue = 0 // 默认值
  let firstRangeAvg = 0
  const childSizes = new Map<Key, number>()
  // 前面给项的高度累计值

  function isFixed() {
    return calcType === CALC_TYPE.FIXED
  }

  const range: RangeOptions = {
    start: 0,
    end: 0,
    padFront: 0,
    padBehind: 0,
  }
  /**
   * 获取前置填充值
   *
   * @returns 返回前置填充值
   */
  function getPadFront() {
    return getEstimateSize() * range.start
  }
  /**
   * 计算并返回在指定范围内的元素后填充的大小。
   *
   * @returns 返回在指定范围内的元素后填充的大小。
   */
  function getPadBehind() {
    const lastIndex = param.uniqueIds.length - 1
    return getEstimateSize() * (lastIndex - range.end)
  }

  /**
   * 更新范围内的起始和结束位置
   *
   * @param start 范围的起始位置
   * @param end 范围的结束位置
   */
  function updateRange(start: number, end: number) {
    range.start = start
    range.end = end
    range.padFront = getPadFront()
    range.padBehind = getPadBehind()
    update({ ...range })
  }

  function getEstimateSize() {
    return isFixed() ? fixedSizeValue : firstRangeAvg || param.estimateSize
  }

  function getIndexoffset(idx: number) {
    if (!idx)
      return 0
    let offset = 0
    for (let i = 0; i < idx; i++) {
      const indexSize = childSizes.get(param.uniqueIds[i])
      offset += typeof indexSize === 'number' ? indexSize : getEstimateSize()
    }
    return offset
  }

  function checkRange(start: number, end: number) {
    const total = param.uniqueIds.length // 总数据量
    const keeps = param.keeps // 缓冲数量
    if (total < keeps) {
      start = 0
      end = total - 1
    }
    else if (end - start < keeps - 1) {
      start = Math.max(0, end - keeps + 1)
      end = start + keeps - 1
    }
    updateRange(start, end)
  }

  function getScrollOvers() {
    // 偏移量 / 每项高度 = 当前滚动位置 / 每项高度 = 当前滚动的行数
    if (isFixed()) {
      return Math.floor(offsetValue / getEstimateSize())
    }
    else {
      // 二分查找
      let low = 0
      let high = param.uniqueIds.length
      let mid = 0
      let midOffset = 0
      while (low <= high) {
        mid = low + Math.floor((high - low) / 2)
        midOffset = getIndexoffset(mid)
        if (midOffset === offsetValue) {
          return mid
        }
        else if (midOffset < offsetValue) {
          low = mid + 1
        }
        else if (midOffset > offsetValue) {
          high = mid - 1
        }
      }
      return low > 0 ? --low : 0
    }
  }

  function getEndByStart(start: number) {
    const computedEnd = start + param.keeps - 1
    return Math.min(computedEnd, param.uniqueIds.length - 1)
  }

  function handleScrollFront() {
    const scrollOvers = getScrollOvers()
    if (scrollOvers > range.start) {
      return
    }
    const start = Math.max(scrollOvers - param.buffer, 0)
    checkRange(start, getEndByStart(start))
  }

  function handleScrollBehind() {
    const scrollOvers = getScrollOvers()
    if (scrollOvers < range.start + param.buffer) {
      // 看一下是不是在缓冲区内
      return
    }
    // const start = Math.max(scrollOvers - param.buffer, 0)

    checkRange(scrollOvers, getEndByStart(scrollOvers))
  }

  function handleScroll(offset: number) {
    const direction = offset < offsetValue ? 'FRONT' : 'BEHIND'
    offsetValue = offset
    // 向上滑动 还是向下滑动
    switch (direction) {
      case 'FRONT':
        handleScrollFront()
        break
      case 'BEHIND':
        handleScrollBehind()
        break
    }
  }

  function handleResize(key: string, size: number) {
    switch (calcType) {
      case CALC_TYPE.INIT:
        fixedSizeValue = size
        calcType = CALC_TYPE.FIXED
        break
      case CALC_TYPE.FIXED:
        // 固定计算
        if (size !== fixedSizeValue) {
          calcType = CALC_TYPE.DYNAMIC
          fixedSizeValue = 0
        }
        break
      case CALC_TYPE.DYNAMIC:
        // 动态计算
        // 根据当前显示的数量，计算滚动条的高度
        if (childSizes.size < Math.min(param.keeps, param.uniqueIds.length)) {
          // 计算平均值
          firstRangeAvg
            = [...childSizes.values()].reduce((acc, cur) => acc + cur, 0)
            / childSizes.size
        }
        break
    }
  }

  checkRange(0, param.keeps - 1)

  return {
    handleScroll,
    handleResize,
  }
}
