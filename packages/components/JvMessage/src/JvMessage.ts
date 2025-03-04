export const jvMessageProps = {} as const
export interface JvMessageProps {
  /** 消息类型 */
  type?: 'info' | 'success' | 'warning' | 'danger'
  /** 消息内容 */
  message: string | VNode
  /** 持续时间，单位毫秒 */
  duration?: number
  /** 图标 */
  icon?: string
  /** 可关闭的 */
  closable?: boolean
  /** 通知的可见性 */
  modelValue?: boolean
  /* 销毁回调 */
  onDestory?: () => void
  /** 垂直偏移 */
  offset?: number
};

export type CreateMessageProps = Omit<JvMessageProps, 'onDestory'>

export interface JvMessageEmits {
  (e: 'close', uid: number): void
  (e: 'update:modelValue', visible: boolean): void
}
export interface JvMessageSlots {}
export interface JvMessageExpose {
  bottomOffset: ComputedRef<number>
  visible: Ref<boolean>
}
