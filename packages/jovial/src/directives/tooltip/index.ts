import type { TooltipProps, TriggerKeys } from '@/components/JvTooltip'

import type { Placement } from '@popperjs/core'
import JvTooltip from '@/components/JvTooltip/src/JvTooltip.vue'
import { findComponentParent } from '@/composables/directiveComponent'
import { isObject } from '@jovial/utils'
// Types
import { type ComponentInternalInstance, type ConcreteComponent, type Directive, type DirectiveBinding, mergeProps, render } from 'vue'

type TooltipBinding = string | Partial<TooltipProps>
// 提取 TooltipProps 的 placement 类型
type TooltipElement = HTMLElement & {
  _tooltipContainer?: HTMLElement
  _tooltipVm?: ComponentInternalInstance
}

function mountTooltipComponent(
  component: Component,
  props?:
    | Record<string, any>
    | ((binding: DirectiveBinding) => Record<string, any>),
) {
  return function (el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    const _props = typeof props === 'function' ? props(binding) : props
    const text = binding.value?.text ?? binding.value ?? _props?.text
    const value = isObject(binding.value) ? binding.value : {}
    const concreteComponent = (
      typeof component === 'string' ? resolveComponent(component) : component
    ) as ConcreteComponent
    // Get the children from the props or directive value, or the element's children
    const children = () => text ?? el.textContent

    // If vnode.ctx is the same as the instance, then we're bound to a plain element
    // and need to find the nearest parent component instance to inherit provides from
    const provides
      = (vnode.ctx === binding.instance!.$
        ? findComponentParent(vnode, binding.instance!.$)?.provides
        : vnode.ctx?.provides) ?? binding.instance!.$.provides

    const node = h(concreteComponent, mergeProps(_props, value, {
      activator: el,
    }), children)
    // 将组件的 appContext 和 provides 合并到节点中
    node.appContext = Object.assign(
      Object.create(null),
      (binding.instance as ComponentPublicInstance).$.appContext,
      { provides },
    )
    render(node, el)
  }
}

export const Tooltip: Directive<TooltipElement, TooltipBinding, TriggerKeys, Placement> = {
  mounted: mountTooltipComponent(JvTooltip, {
    // JvTooltip 的 默认props参数
    trigger: 'hover',
    content: '',
    placement: 'top',
    openDelay: 250,
    closeDelay: 250,
    arrow: true,
    popperOptions: {},
    disableAnimation: false,
  }),
  updated: mountTooltipComponent(JvTooltip, {
    // JvTooltip 的 默认props参数
    trigger: 'hover',
    content: '',
    placement: 'top',
    openDelay: 250,
    closeDelay: 250,
    arrow: true,
    popperOptions: {},
    disableAnimation: false,
  }),
  beforeUnmount: (el) => {
    render(null, el)
  },
}

export default Tooltip
