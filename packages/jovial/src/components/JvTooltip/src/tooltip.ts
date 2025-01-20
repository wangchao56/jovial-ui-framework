import type { JvPopperInstance } from '@components/JvPopper'
import type { Options, Placement } from '@popperjs/core'
import type { ComponentPublicInstance, PropType, Ref, VNodeChild } from 'vue'

export type Trigger = 'click' | 'hover' | 'focus' | 'contextmenu'

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
/* @vue-ignore */
export interface TooltipProps {
  /** 显示的内容，也可被 slot#content 覆盖 */
  content?: string
  /** Tooltip 组件出现的位置 */
  placement?: Placement
  /** Tooltip 组件是否禁用 */
  disabled?: boolean
  /** 出现位置的偏移量 */
  offset?: number
  /** 如何触发 Tooltip */
  trigger?: Trigger
  /** 用来标识虚拟触发是否被启用 */
  virtualTriggering?: boolean
  /** 当鼠标点击或者聚焦在触发元素上时， 可以定义一组键盘按键并且通过它们来控制 Tooltip 的显示 */
  triggerKeys?: Array<string>
  /** 是否支持手动触发 */
  manual?: boolean
  /** popper参数 */
  popperOptions?: Partial<Options>
  /** 过渡动画名称 */
  transition?: string
  /** 延迟显示 */
  openDelay?: number
  /** 延迟隐藏 */
  closeDelay?: number
  arrow?: boolean
}
export const tooltipEmits = {} as const
export interface TooltipEmits {
  (e: 'visibleChange', value: boolean): void
}
export const tooltipSlots = {} as const
export interface TooltipSlots {
  /** @description 自定义内容 */
  content: (() => VNodeChild | VNodeChild[]) | undefined
  /** 自定义触发器 */
  default: (...args: any[]) => VNodeChild
}
export interface TooltipExpose {
  popperRef?: Ref<JvPopperInstance | undefined>
  /** @description 显示  */
  show: () => void
  /**  关闭  */
  hide: () => void
}
