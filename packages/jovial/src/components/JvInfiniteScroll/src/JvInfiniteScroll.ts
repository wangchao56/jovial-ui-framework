import type BScroll from '@better-scroll/core'

export const jvInfiniteScrollProps = {} as const
export interface JvInfiniteScrollProps {
  /** 是否启用上拉加载 */
  pullup?: boolean
  /** 是否启用下拉刷新 */
  pulldown?: boolean
  /** 滚动事件派发类型 */
  probeType?: 1 | 2 | 3
  /** 数据列表 */
  data?: any[]
  /** 刷新延迟时间 */
  refreshDelay?: number
}
export interface JvInfiniteScrollEmits {
  /** 滚动事件 */
  (e: 'scroll', pos: { x: number, y: number }): void
  /** 滚动到底部 */
  (e: 'scrollToEnd'): void
  /** 下拉刷新 */
  (e: 'pulldown'): void
  /** 滚动开始前 */
  (e: 'beforeScroll'): void
}
export interface JvInfiniteScrollSlots {
  // 插槽定义
  default?: () => any
}
export interface InfiniteScrollExpose {
  /** 手动刷新滚动 */
  refresh: () => void
  /** 滚动到指定位置 */
  scrollTo: (x: number, y: number, time?: number) => void
  /** 获取当前滚动实例 */
  getScroll: () => BScroll | null
}
