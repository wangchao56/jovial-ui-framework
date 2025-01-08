import type { Placement } from '@floating-ui/vue'
import type { JvPopperInstance } from '@jovial/components/popper'
import type { ComponentPublicInstance, PropType, Ref, VNodeChild } from 'vue'

export const tooltipProps = {
  activator: {
    type: [String, Object] as PropType<
      string | Element | 'parent' | ComponentPublicInstance
    >,
    default: 'parent',
  },
  content: {
    type: String as PropType<string>,
    default: '',
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'top',
  },
  disabled: Boolean as PropType<boolean>,
  offset: Number as PropType<number>,
  trigger: {
    type: String as PropType<'hover' | 'click' | 'focus' | 'contextmenu'>,
    default: 'hover',
  },
  virtualTriggering: Boolean as PropType<boolean>,
  triggerKeys: Array as PropType<string[]>,
} as const

export interface TooltipProps {
  activator?: (string & {}) | Element | 'parent' | ComponentPublicInstance
  /** 显示的内容，也可被 slot#content 覆盖 */
  content?: string
  /** Tooltip 组件出现的位置 */
  placement?: Placement
  /** Tooltip 组件是否禁用 */
  disabled?: boolean
  /** 出现位置的偏移量 */
  offset?: number
  /** 如何触发 Tooltip */
  trigger?: 'hover' | 'click' | 'focus' | 'contextmenu'
  /** 用来标识虚拟触发是否被启用 */
  virtualTriggering?: boolean
  /** 当鼠标点击或者聚焦在触发元素上时， 可以定义一组键盘按键并且通过它们来控制 Tooltip 的显示 */
  triggerKeys?: Array<string>
}
export const tooltipEmits = {} as const
export interface TooltipEmits {}
export const tooltipSlots = {} as const
export interface TooltipSlots {
  content: (() => VNodeChild | VNodeChild[]) | undefined
  default: (...args: any[]) => VNodeChild
  // activator: (() => VNodeChild | VNodeChild[]) | undefined
}
export interface TooltipExpose {
  popperRef: Ref<JvPopperInstance | undefined>
}
