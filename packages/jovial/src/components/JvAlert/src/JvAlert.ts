export const jvAlertProps = {
  type: {
    type: String,
    default: 'info',
  },
  message: {
    type: String,
    required: true,
  },
  closable: {
    type: Boolean,
    default: false,
  },
  closeText: {
    type: String,
    default: '',
  },
  showIcon: {
    type: Boolean,
    default: false,
  },
} as const

export interface JvAlertProps {
  /** 类型 */
  type?: 'success' | 'info' | 'warning' | 'error'
  /** 标题 */
  title: string
  /** 描述 */
  description: string
  /** 是否显示关闭按钮 */
  closable?: boolean
  /** 关闭按钮文字 */
  closeText?: string
  /** 是否显示图标 */
  showIcon?: boolean
  /** 自定义icon名称 */
  icon?: string
}

export interface JvAlertEmits {
  /** 关闭弹窗 */
  (event: 'closed'): void
}

export interface JvAlertSlots {
  /** 默认插槽 */
  default: () => void
}

export interface JvAlertExpose {
  /** 关闭弹窗 */
  close: () => void
  /** 打开弹窗 */
  open: () => void
}
