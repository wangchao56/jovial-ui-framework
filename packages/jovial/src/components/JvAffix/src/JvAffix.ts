import type { PropType } from 'vue'

export const jvAffixProps = {
  /** 距离窗口顶部的偏移量 */
  offset: {
    type: Number,
    default: 0,
  },
  /** 距离窗口底部的偏移量 */
  bottomOffset: {
    type: Number,
    default: 0,
  },
  /** 固定的位置，可选值为 top、bottom */
  position: {
    type: String as PropType<'top' | 'bottom'>,
    default: 'top',
  },
  /** 设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 */
  target: {
    type: Function as PropType<() => HTMLElement | null | Window>,
    default: () => window,
  },
  /** z-index 值 */
  zIndex: {
    type: Number,
    default: 100,
  },
} as const

export type JvAffixProps = ExtractPropTypes<typeof jvAffixProps>

export interface JvAffixEmits {
  (e: 'change', fixed: boolean): void
  (e: 'scroll', data: { scrollTop: number, fixed: boolean }): void
}

export interface JvAffixSlots {
  default?: () => any
}

export interface JvAffixExpose {
  /** 更新固钉状态 */
  update: () => void
  /** 获取固钉当前状态 */
  getFixed: () => boolean
}
