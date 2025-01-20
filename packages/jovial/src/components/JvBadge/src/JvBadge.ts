export const jvBadgeProps = {
  count: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    default: 99,
  },
  dot: {
    type: Boolean,
    default: false,
  },
} as const

export interface JvBadgeProps {
  /** 数量 */
  count: number
  /** 最大值 */
  max?: number
  /** 显示小红点 */
  dot?: boolean
  /** 位置 */
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large'
  /** 圆角 */
  rounded?: boolean
  /** 偏移量[x,y] */
  offset?: [number, number]
  /** 自定义样式 */
  style?: any
  /** 自定义颜色 */
  color?: string
}

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
