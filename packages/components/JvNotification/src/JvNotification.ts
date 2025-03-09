import type { ExtractPropTypes, PropType } from 'vue'

export type NotificationType = 'info' | 'success' | 'warning' | 'error'
export type NotificationPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'

export const jvNotificationProps = {
  /** 通知的唯一标识 */
  id: {
    type: String,
    default: '',
  },
  /** 通知的可见性 */
  visible: {
    type: Boolean,
    default: false,
  },
  /** 通知的标题 */
  title: {
    type: String,
    default: '',
  },
  /** 消息内容 */
  message: {
    type: String,
    default: '',
  },
  /** 类型 */
  type: {
    type: String as PropType<NotificationType>,
    default: 'info',
  },
  /** 显示时间, 0 表示不自动关闭 */
  duration: {
    type: Number,
    default: 4500,
  },
  /** 位置 */
  position: {
    type: String as PropType<NotificationPosition>,
    default: 'top-right',
  },
  /** 是否显示关闭按钮 */
  showClose: {
    type: Boolean,
    default: true,
  },
  /** 自定义图标 */
  icon: {
    type: String,
    default: '',
  },
  /** z-index 层级 */
  zIndex: {
    type: Number,
    default: 0,
  },
  /** 关闭回调 */
  onClose: {
    type: Function as PropType<() => void>,
    default: undefined,
  },
  /** 是否使用HTML片段(需要在使用时确保XSS安全) */
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: false,
  },
  /** 自定义样式 */
  customClass: {
    type: String,
    default: '',
  },
  /** 偏移距离 */
  offset: {
    type: [Number, Array] as PropType<number | number[]>,
    default: undefined,
  },
  /** 合并内容相同的消息 */
  grouping: {
    type: Boolean,
    default: true,
  },
  /** 合并消息的次数 */
  repeatNum: {
    type: Number,
    default: 1,
  },
  /** 鼠标移入时停止 */
  pauseOnHover: {
    type: Boolean,
    default: true,
  },
} as const

export type JvNotificationProps = ExtractPropTypes<typeof jvNotificationProps>

export interface JvNotificationEmits {
  /** 更新通知的可见性 */
  (e: 'update:visible', value: boolean): void
  /** 销毁时触发 */
  (e: 'destroy'): void
  /** 进入时触发 */
  (e: 'enter'): void
  /** 离开时触发 */
  (e: 'leave'): void
  /** 进入动画结束时触发 */
  (e: 'afterEnter'): void
  /** 离开动画结束时触发 */
  (e: 'afterLeave'): void
}

export interface JvNotificationSlots {
  /** 标题插槽 */
  header?: () => any
  /** 默认插槽 */
  default?: () => any
  /** 图标插槽 */
  icon?: () => any
}

export interface JvNotificationExpose {
  /** 关闭通知 */
  close: () => void
  /** 销毁通知 */
  beforeDestroy: () => Promise<boolean>
  /** 设置通知的挂载点 */
  setAppendTo: (value: HTMLElement | string) => void
  /** 设置通知的禁用状态 */
  setDisabled: (value: boolean) => void
}

export function getFianlOffset(
  offset: number | number[] | undefined,
  defineOffset: number[] = [16, 16],
) {
  if (typeof offset === 'number') {
    defineOffset[0] = offset
  }
  if (Array.isArray(offset)) {
    defineOffset = offset
  }
  return defineOffset
}
