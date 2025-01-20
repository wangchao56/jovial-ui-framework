import type { Slot } from 'vue'

export const dialogProps = {
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '500px',
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
} as const

export interface DialogProps {
  /** 是否显示对话框 */
  modelValue: boolean
  /** 对话框标题 */
  title?: string
  /** 对话框宽度 */
  width?: number | string
  /** 是否全屏显示 */
  fullscreen?: boolean
  /** 点击遮罩层是否关闭对话框 */
  closeOnClickOverlay?: boolean
  /** 确认按钮文字 */
  confirmText?: string
  /** 取消按钮文字 */
  cancelText?: string
  /** 内容 */
  content?: string | VNode
  /** 操作按钮的位置 */
  actionPosition?: 'left' | 'right'
}

export interface DialogEmits {
  (event: 'update:modelValue', value: boolean): void
  (event: 'open'): void
  (event: 'cancel'): void
  (event: 'confirm'): void
}

export interface DialogSlots {
  header: Slot<unknown>
  default: Slot<any>
  footer: Slot<unknown>
  actions: Slot<unknown>
  content: Slot<unknown>
}

export interface DialogExpose {}
