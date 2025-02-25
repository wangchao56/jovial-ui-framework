import type { ExtractPropTypes, PropType, Slot } from 'vue'

export const jvAlertProps = {
  /** 类型 */
  type: {
    type: String as PropType<'success' | 'info' | 'warning' | 'error'>,
    default: 'info',
  },
  /** 标题 */
  title: {
    type: String as PropType<string>,
    required: true,
  },
  /** 描述 */
  description: {
    type: String as PropType<string>,
    default: '',
  },
  /** 是否显示关闭按钮 */
  closable: {
    type: Boolean,
    default: false,
  },
  /** 关闭按钮文字 */
  closeText: {
    type: String as PropType<string>,
    default: '',
  },
  /** 是否显示图标 */
  showIcon: {
    type: Boolean,
    default: false,
  },
  /** 自定义icon名称 */
  icon: {
    type: String as PropType<string>,
    default: '',
  },
} as const

export type JvAlertProps = ExtractPropTypes<typeof jvAlertProps>

export interface JvAlertEmits {
  /** 关闭弹窗 */
  (event: 'closed'): void
}

export interface JvAlertSlots {
  /** 默认插槽 */
  default: Slot
}

export interface JvAlertExpose {
  /** 关闭弹窗 */
  close: () => void
  /** 打开弹窗 */
  open: () => void
}
