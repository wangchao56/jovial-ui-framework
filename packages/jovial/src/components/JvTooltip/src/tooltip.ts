import type { PopperExpose, ReferenceType } from '@components/JvPopper'
import type { createNamespace } from '@jovial/utils'
import type { Options, Placement, VirtualElement } from '@popperjs/core'
import type { ComponentPublicInstance, CSSProperties, DeepReadonly, InjectionKey, PropType, Ref, Slot, Slots } from 'vue'

export type Trigger = 'click' | 'hover' | 'focus' | 'contextmenu' | string
export type TriggerKeys = 'click' | 'hover' | 'focus' | 'contextmenu'
export const jvTooltipProps = {
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
  /**
   * 是否显示
   */
  disabled: Boolean as PropType<boolean>,
  offset: Number as PropType<number>,
  trigger: {
    type: String as PropType<'hover' | 'click' | 'focus' | 'contextmenu'>,
    default: 'hover',
  },
  popperOptions: Object as PropType<Partial<Options>>,
  disableAnimation: Boolean as PropType<boolean>,
  openDelay: {
    type: Number as PropType<number>,
    default: 0,
  },
  closeDelay: {
    type: Number as PropType<number>,
    default: 0,
  },
  arrow: Boolean as PropType<boolean>,
  popperClass: String as PropType<string>,
  popperStyle: Object as PropType<CSSProperties>,
} as const
/* @vue-ignore */
export interface TooltipProps {
  class?: string
  /** 显示的内容，也可被 slot#content 覆盖 */
  content?: string
  /** 是否显示 */
  visible?: boolean
  /** 自定义触发器 */
  activator?: string | Element | 'parent' | VNode | VirtualElement
  /** Tooltip 组件出现的位置 */
  placement?: Placement
  /** Tooltip 组件是否禁用 */
  disabled?: boolean
  /** 出现位置的偏移量 */
  offset?: [number, number] | number
  /** 如何触发 Tooltip */
  trigger?: TriggerKeys
  /** popper参数 */
  popperOptions?: Partial<Options>
  /** 是否禁用动画 */
  disableAnimation?: boolean
  /** 过渡动画名称 */
  // transition?: string
  /** 延迟显示 */
  openDelay?: number
  /** 延迟隐藏 */
  closeDelay?: number
  /** 是否显示箭头 */
  arrow?: boolean
  /** popper 的 class */
  popperClass?: string
  /** popper 的 style */
  popperStyle?: CSSProperties
}
export const tooltipEmits = {} as const
export interface TooltipEmits {
  (e: 'visibleChange', value: boolean): void
  (e: 'update:visible', value: boolean): void
}
export const tooltipSlots = {} as const

export type EventHandler = (e: Event) => void

export interface ActivatorProps {
  'onClick'?: EventHandler
  'onMouseenter'?: EventHandler
  'onMouseleave'?: EventHandler
  'class'?: string
  'data-tooltip-trigger'?: string
}

export interface TooltipSlots extends Slots {
  /** 默认触发器 */
  default: Slot<any>
}
export interface TooltipExpose {
  popperRef?: Ref<PopperExpose | undefined>
  /** @description 显示  */
  show: () => void
  /**  关闭  */
  hide: () => void
}

export interface JvTooltipContext {
  /** 触发器 */
  referenceRef: Readonly<Ref<ReferenceType | null>>
  /** 设置触发器 */
  setReference: (el: HTMLElement | null) => void
  /** 命名空间 */
  bem: DeepReadonly<ReturnType<typeof createNamespace>>
  /** 触发器id */
  tootipId: Readonly<string>
  /** 打开 */
  onOpen: () => void
  /** 关闭 */
  onClose: () => void
  /** 切换 */
  onToggle: () => void
  /** 触发方式 */
  trigger: Readonly<TriggerKeys>
  /** 父元素 */
  parentDom: Readonly<Ref<HTMLElement | null>>
}
export function getTriggerHandlers(trigger: TriggerKeys) {
  return {
    hover: [['mouseenter', 'mouseleave']],
    click: [['click']],
    focus: [['focus', 'blur']],
    contextmenu: [['contextmenu']],
  }[trigger] || []
}
export const JvTooltipContextKey: InjectionKey<JvTooltipContext> = Symbol.for('jovial-tooltip')
export const JvTooltipRootKey: InjectionKey<JvTooltipContext> = Symbol.for('jovial-tooltip-root')

export function createSingleTrigger(fn: Function) {
  let isPending = false
  return () => {
    if (isPending)
      return
    isPending = true
    fn()
    // 可根据需要添加重置逻辑
    // setTimeout(() => isPending = false, timeout)
  }
}

export const tooltipModifiers: Options['modifiers'] = [
  {
    name: 'arrow',
    options: {
      padding: 5,
    },
  },
  {
    name: 'offset',
    options: { offset: [0, 8] },
  },
]
