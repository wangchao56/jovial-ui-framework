import type { Placement } from '@floating-ui/vue'
import type { TriggerType } from '@jienix/typings'
import type { VNodeChild } from 'vue'

export const popoverProps = {} as const
export interface PopoverProps {
  /** 标题 */
  title?: string
  /** 弹出内容 */
  content?: string
  /** 弹出位置 */
  placement?: Placement
  /** 触发方式 */
  trigger?: TriggerType
  disabled?: boolean
  visible?: boolean
  /** 定义渐变动画 */
  transition?: string
  /** 在触发后多久显示内容，单位毫秒 */
  showAfter?: number
  /** 在隐藏内容后多久关闭，单位毫秒 */
  hideAfter?: number
  /** tooltip 出现后自动隐藏延时，单位毫秒 */
  autoClose?: number
  /** Popover 组件的 tabindex */
  // tabindex?: number
  /** 是否将 popover 的下拉列表插入至 body 元素 */
  teleported?: boolean
  /** 当 popover 组件长时间不触发且 persistent 属性设置为 false 时, popover 将会被删除 */
  persistent?: boolean
}
export const popoverEmits = {} as const
export interface PopoverEmits {
  show: () => void
  hide: () => void
  beforeEnter: () => void
  afterEnter: () => void
  beforeLeave: () => void
  afterLeave: () => void
}
export const popoverSlots = {} as const
export interface PopoverSlots {
  default: (...args: any[]) => VNodeChild
  reference: (...args: any[]) => VNodeChild
}
export interface PopoverExpose {
  show: () => void
  hide: () => void
}
