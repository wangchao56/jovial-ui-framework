import type { Slot } from 'vue'

export const jvBackTopProps = {
  /** 滚动高度达到此参数值才出现 */
  visibilityHeight: {
    type: Number,
    default: 400,
  },
  /** 回到顶部的目标元素 */
  target: {
    type: String,
    default: 'window',
  },
  /** 滚动动画持续时间,单位毫秒 */
  duration: {
    type: Number,
    default: 500,
  },
  /** 是否右下角固定显示 */
  right: {
    type: Number,
    default: 40,
  },
  /** 距离底部距离 */
  bottom: {
    type: Number,
    default: 40,
  },
} as const

export type JvBackTopProps = ExtractPropTypes<typeof jvBackTopProps>

export interface JvBackTopEmits {
  /** 滚动事件 */
  (e: 'scroll', data: { scrollTop: number }): void
  /** 点击事件 */
  (e: 'click', event: MouseEvent): void
}

export interface JvBackTopSlots {
  /** 默认插槽 */
  default?: Slot
}

export interface JvBackTopExpose {
  /** 滚动事件 */
  handleScroll: () => void
  /** 滚动到顶部 */
  scrollToTop: () => void
}
