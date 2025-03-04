// Utilities
import { includes } from './helpers'

const block = ['top', 'bottom'] as const
const inline = ['start', 'end', 'left', 'right'] as const
type Tblock = (typeof block)[number]
type Tinline = (typeof inline)[number]
export type Anchor =
  | Tblock
  | Tinline
  | 'center'
  | 'center center'
  | `${Tblock} ${Tinline | 'center'}`
  | `${Tinline} ${Tblock | 'center'}`
export type ParsedAnchor =
  | { side: 'center', align: 'center' }
  | { side: Tblock, align: 'left' | 'right' | 'center' }
  | { side: 'left' | 'right', align: Tblock | 'center' }

/** Parse a raw anchor string into an object */
/**
 * 解析锚点字符串并返回一个包含 side 和 align 属性的对象
 * @param anchor - 锚点字符串，可以是 'top'、'bottom'、'start'、'end'、'left'、'right'、'center' 或它们的组合
 * @param isRtl - 是否为从右到左的布局
 * @returns 一个包含 side 和 align 属性的对象
 */
export function parseAnchor(anchor: Anchor, isRtl: boolean) {
  // 将锚点字符串按空格分割成数组，并将第一个元素赋值给 side，第二个元素赋值给 align
  let [side, align] = anchor.split(' ') as [
    Tblock | Tinline | 'center',
    Tblock | Tinline | 'center' | undefined,
  ]
  // 如果 align 不存在，则根据 side 的值设置默认的 align
  if (!align) {
    align = includes(block, side)
      ? 'start'
      : includes(inline, side)
        ? 'top'
        : 'center'
  }

  // 返回一个包含 side 和 align 属性的对象，side 和 align 的值通过 toPhysical 函数转换为物理方向
  return {
    side: toPhysical(side, isRtl),
    align: toPhysical(align, isRtl),
  } as ParsedAnchor
}

/**
 * 将逻辑方向转换为物理方向
 * @param str - 逻辑方向字符串，可以是 'center'、'top'、'bottom'、'start'、'end'、'left' 或 'right'
 * @param isRtl - 是否为从右到左的布局
 * @returns 物理方向字符串
 */
export function toPhysical(str: 'center' | Tblock | Tinline, isRtl: boolean) {
  // 如果逻辑方向是 'start'，则根据 isRtl 的值返回 'right' 或 'left'
  if (str === 'start')
    return isRtl ? 'right' : 'left'
  // 如果逻辑方向是 'end'，则根据 isRtl 的值返回 'left' 或 'right'
  if (str === 'end')
    return isRtl ? 'left' : 'right'
  // 如果逻辑方向是 'center'、'top'、'bottom'、'left' 或 'right'，则直接返回该字符串
  return str
}

/**
 * 翻转锚点的侧方向
 * @param anchor - 包含 side 和 align 属性的对象
 * @returns 一个新的对象，其中 side 属性被翻转，align 属性保持不变
 */
export function flipSide(anchor: ParsedAnchor) {
  // 使用对象字面量和计算属性名来翻转 side 属性的值
  return {
    side: {
      center: 'center',
      top: 'bottom',
      bottom: 'top',
      left: 'right',
      right: 'left',
    }[anchor.side],
    // align 属性保持不变
    align: anchor.align,
  } as ParsedAnchor
}

export function flipAlign(anchor: ParsedAnchor) {
  return {
    side: anchor.side,
    align: {
      center: 'center',
      top: 'bottom',
      bottom: 'top',
      left: 'right',
      right: 'left',
    }[anchor.align],
  } as ParsedAnchor
}

export function flipCorner(anchor: ParsedAnchor) {
  return {
    side: anchor.align,
    align: anchor.side,
  } as ParsedAnchor
}

export function getAxis(anchor: ParsedAnchor) {
  return includes(block, anchor.side) ? 'y' : 'x'
}
