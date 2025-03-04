import type { CSSProperties } from 'vue'

export const jvBadgeProps = {
  /** 数量 */
  count: {
    type: Number,
    required: true,
  },
  /** 最大值 */
  max: {
    type: Number,
    default: 99,
  },
  /** 显示小红点 */
  dot: {
    type: Boolean,
    default: false,
  },
  /** 位置 */
  position: {
    type: String as PropType<'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'>,
    default: 'top-right',
  },
  /** 尺寸 */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium',
  },
  /** 圆角 */
  rounded: {
    type: Boolean,
    default: true,
  },
  /** 偏移量 */
  offset: {
    type: Array as PropType<number[]>,
    default: () => [0, 0],
  },
  /** 自定义样式 */
  style: {
    type: Object as PropType<CSSProperties>,
  },
  /** 自定义颜色 */
  color: {
    type: String,
  },
} as const

export type JvBadgeProps = ExtractPropTypes<typeof jvBadgeProps>

export const jvBadgeEmits = {
  click: (_event: MouseEvent) => true,
} as const

export interface JvBadgeEmits {
  (e: 'click', event: MouseEvent): void
}

export const jvBadgeSlots = {
  default: () => true,
} as const

export interface JvBadgeSlots {
  default: () => void
}

export interface JvBadgeExpose {}
