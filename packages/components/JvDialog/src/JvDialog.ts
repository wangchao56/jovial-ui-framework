import type { Slot } from 'vue'

export const jvDialogProps = {
  /** 是否显示对话框 */
  modelValue: {
    type: Boolean,
    required: true,
  },
  /** 对话框标题 */
  title: {
    type: String,
    default: '',
  },
  /** 对话框宽度 */
  width: {
    type: String,
    default: '500px',
  },
  /** 是否全屏显示 */
  fullscreen: {
    type: Boolean,
    default: false,
  },
  /** 点击遮罩层是否关闭对话框 */
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  /** 确认按钮文字 */
  confirmText: {
    type: String,
    default: '确认',
  },
  /** 取消按钮文字 */
  cancelText: {
    type: String,
    default: '取消',
  },
  /** 内容 */
  content: {
    type: String,
    default: '',
  },
  /** 操作按钮的位置 */
  actionPosition: {
    type: String as PropType<'left' | 'right'>,
    default: 'right',
  },
} as const

export type JvDialogProps = ExtractPropTypes<typeof jvDialogProps>

export interface JvDialogEmits {
  /** 更新对话框是否显示 */
  (event: 'update:modelValue', value: boolean): void
  /** 打开对话框 */
  (event: 'open'): void
  /** 取消 */
  (event: 'cancel'): void
  /** 确认 */
  (event: 'confirm'): void
}

export interface JvDialogSlots {
  /** 头部 */
  header: Slot<unknown>
  /** 默认内容 */
  default: Slot<any>
  /** 底部 */
  footer: Slot<unknown>
  /** 操作按钮 */
  actions: Slot<unknown>
  /** 内容 */
  content: Slot<unknown>
}

export interface JvDialogExpose {}
