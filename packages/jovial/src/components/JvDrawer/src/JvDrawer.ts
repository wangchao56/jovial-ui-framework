export const jvDrawerProps = {
  modelValue: {
    type: Boolean,
    required: true,
  },
  position: {
    type: String,
    default: 'right',
  },
  width: {
    type: String,
    default: '300px',
  },
  height: {
    type: String,
    default: '100%',
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
} as const

export interface JvDrawerProps {
  /** 是否显示  */
  modelValue: boolean
  /** 抽屉位置  */
  position?: 'left' | 'right' | 'top' | 'bottom'
  /** 宽度  */
  width?: string
  /** 高度  */
  height?: string
  /**   */
  zIndex?: number
  /** 点击遮罩层是否关闭  */
  closeOnClickOverlay?: boolean
  /** 可关闭的 */
  closable?: boolean
}

export interface JvDrawerEmits {
  (event: 'update:modelValue', value: boolean): void
  (event: 'opened'): void
  (event: 'close'): void
  (event: 'closed'): void
}

export interface JvDrawerSlots {
  default: () => void
}

export interface JvDrawerExpose {}
