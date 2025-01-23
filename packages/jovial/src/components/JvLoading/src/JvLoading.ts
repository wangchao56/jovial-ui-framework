export const jvLoadingProps = {
  showStopButton: {
    type: Boolean,
    default: true,
  },
} as const

export interface JvLoadingProps {
  /** 大小(px) */
  size?: number
  /** 颜色 */
  color?: string
  /** 点的数量 */
  count?: number
  /** 动画速度(秒) */
  speed?: number
}

export const jvLoadingEmits = {
  stop: () => true,
}

export interface JvLoadingEmits {}

export const jvLoadingSlots = {} as const

export interface JvLoadingSlots {}

export interface JvLoadingExpose {}
