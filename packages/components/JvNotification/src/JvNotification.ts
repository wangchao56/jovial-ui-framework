export type NotificationType = 'info' | 'success' | 'warning' | 'error'
export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export const jvNotificationProps = {
  // 标题
  title: {
    type: String,
    default: '',
  },
  // 消息内容
  message: {
    type: String,
    default: '',
  },
  // 类型
  type: {
    type: String as () => NotificationType,
    default: 'info',
  },
  // 显示时间, 0 表示不自动关闭
  duration: {
    type: Number,
    default: 4500,
  },
  // 位置
  position: {
    type: String as () => NotificationPosition,
    default: 'top-right',
  },
  // 是否显示关闭按钮
  showClose: {
    type: Boolean,
    default: true,
  },
  // 自定义图标
  icon: {
    type: String,
    default: '',
  },
  // z-index 层级
  zIndex: {
    type: Number,
    default: 0,
  },
  // 关闭回调
  onClose: {
    type: Function as PropType<() => void>,
    default: undefined,
  },
} as const

export interface JvNotificationProps {
  /** 通知的唯一标识 */
  id?: string
  /** 通知的可见性 */
  visible?: boolean
  /** 通知的标题 */
  title?: string
  /** 通知的消息内容 */
  message?: string
  /** 通知的类型 */
  type?: NotificationType
  /** 通知的显示时间,单位毫秒,设置为 0 则不会自动关闭 */
  duration?: number
  /** 通知的位置 */
  position?: NotificationPosition
  /** 鼠标移入时停止 */
  pauseOnHover?: boolean
  /** 是否显示关闭按钮 */
  showClose?: boolean
  /** 自定义图标 */
  icon?: string
  /** z-index 层级 */
  zIndex?: number
  /** 关闭回调 */
  onClose?: () => void
  /** 是否使用HTML片段(需要在使用时确保XSS安全) */
  dangerouslyUseHTMLString?: boolean
  /** 自定义样式 */
  customClass?: string
  /** 偏移距离 */
  offset?: number | number[]
  /** 合并内容相同的消息 */
  grouping?: boolean
  /** 合并消息的次数 */
  repeatNum?: number
}

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

export function getFianlOffset(offset: number | number[] | undefined, defineOffset: number[] = [16, 16]) {
  if (typeof offset === 'number') {
    defineOffset[0] = offset
  }
  if (Array.isArray(offset)) {
    defineOffset = offset
  }
  return defineOffset
}
