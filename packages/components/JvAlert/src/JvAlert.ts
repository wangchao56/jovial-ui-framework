import type { Type } from '@jienix/typings'
import type { ExtractPropTypes, PropType, Slot } from 'vue'

export const jvAlertProps = {
  /**
   * 是否显示
   */
  visible: {
    type: Boolean,
    default: true,
  },
  /**
   * 类型
   */
  type: {
    type: String as PropType<Type>,
    default: 'info',
    validator: (value: string) => ['info', 'success', 'warning', 'error'].includes(value),
  },
  /**
   * 变体
   */
  variant: {
    type: String as PropType<'filled' | 'outlined' | 'border-left'>,
    default: 'filled',
    validator: (value: string) => ['filled', 'outlined', 'border-left'].includes(value),
  },
  /**
   * 标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * 消息
   */
  message: {
    type: String,
    default: '',
  },
  /**
   * 图标
   */
  icon: {
    type: String,
    default: '',
  },
  /**
   * 是否显示默认图标
   */
  showIcon: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否可关闭
   */
  dismissible: {
    type: Boolean,
    default: false,
  },
  /**
   * 关闭按钮文本
   */
  closeText: {
    type: String,
    default: '',
  },
  /**
   * 是否紧凑
   */
  dense: {
    type: Boolean,
    default: false,
  },
} as const

export type JvAlertProps = ExtractPropTypes<typeof jvAlertProps>

export interface JvAlertEmits {
  /** 关闭弹窗 */
  (event: 'update:visible', value: boolean): void
  /** 关闭弹窗 */
  (event: 'close'): void
}

export interface JvAlertSlots {
  /** 默认插槽 */
  default: Slot
  /** 图标插槽 */
  icon: Slot
  /** 标题插槽 */
  title: Slot
  /** 消息插槽 */
  message: Slot
  /** 关闭按钮插槽 */
  close: Slot
}

export interface JvAlertExpose {
  /** 关闭弹窗 */
  close: () => void
  /** 打开弹窗 */
  open: () => void
}
