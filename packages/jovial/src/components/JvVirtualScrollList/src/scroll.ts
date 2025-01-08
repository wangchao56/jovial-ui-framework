export interface ScrollTo {
  (x: number, y: number): void
  (options: {
    left?: number
    top?: number
    behavior?: ScrollBehavior
    debounce?: boolean
  }): void
  (options: {
    index: number
    behavior?: ScrollBehavior
    debounce?: boolean
  }): void
  (options: {
    key: string | number
    behavior?: ScrollBehavior
    debounce?: boolean
  }): void
  (options: {
    position: 'top' | 'bottom'
    behavior?: ScrollBehavior
    debounce?: boolean
  }): void
}
type ScrollBehavior = 'auto' | 'smooth'

// eslint-disable-next-line unused-imports/no-unused-vars
function scrollTop(x: number, y: number): void
function scrollTop(options: {
  left?: number
  top?: number
  behavior?: ScrollBehavior
  debounce?: boolean
}): void
function scrollTop(options: {
  index: number
  behavior?: ScrollBehavior
  debounce?: boolean
}): void
function scrollTop(options: {
  key: string | number
  behavior?: ScrollBehavior
  debounce?: boolean
}): void
function scrollTop(options: {
  position: 'top' | 'bottom'
  behavior?: ScrollBehavior
  debounce?: boolean
}): void

function scrollTop(arg1: any, arg2?: number): void {
  if (typeof arg1 === 'number' && typeof arg2 === 'number') {
    // 处理 (x: number, y: number) 的情况
    scrollToCoordinates(arg1, arg2)
  }
  else if (typeof arg1 === 'object') {
    const options = arg1 as {
      left?: number
      top?: number
      index?: number
      key?: string | number
      position?: 'top' | 'bottom'
      behavior?: ScrollBehavior
      debounce?: boolean
    }

    if (options.left !== undefined || options.top !== undefined) {
      // 处理 { left?: number, top?: number, ... } 的情况
      scrollToCoordinates(options.left || 0, options.top || 0)
    }
    else if (options.index !== undefined) {
      // 处理 { index: number, ... } 的情况
      scrollToIndex(options.index)
    }
    else if (options.key !== undefined) {
      // 处理 { key: string | number, ... } 的情况
      scrollToKey(options.key)
    }
    else if (options.position !== undefined) {
      // 处理 { position: 'top' | 'bottom', ... } 的情况
      scrollToPosition(options.position)
    }
    else {
      // 如果没有匹配到任何情况，可以抛出一个错误或者进行其他处理
      throw new Error('Invalid scroll options')
    }
  }
  else {
    // 处理参数类型不匹配的情况
    throw new TypeError('Invalid arguments for scrollTo function')
  }
}
