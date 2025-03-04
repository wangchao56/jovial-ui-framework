import type { ThemeInstance } from '@/components/theme'
import type {
  TooltipProps,
  TriggerKeys,
} from '@components/JvTooltip/src/tooltip'
import type { Placement } from '@popperjs/core'
import type { ComponentInternalInstance, Directive } from 'vue'
import JvPopper, { type PopperProps } from '@/components/JvPopper'
import JvTooltipContent from '@/components/JvTooltip/src/content.vue'
import {
  createTooltipModifiers,
  mapTooltipToPopperProps,
} from '@/components/JvTooltip/src/tooltip-utils'
import { onDebounceToggleHandler, setupTriggerEventsAndApplyEffect } from '@/components/JvTooltip/src/useTootipManager'
import { containerManager } from '@/utils/containerManager'
import { consoleWarn } from '@jienix/utils'
import isEqual from 'lodash-es/isEqual'
import { v4 as uuidv4 } from 'uuid'
import { createVNode, render } from 'vue'

interface TooltipBindingValue extends Partial<TooltipProps> {
  theme?: ThemeInstance
}

type TooltipBinding = string | TooltipBindingValue

const TRIGGER_KEYS = ['hover', 'click', 'focus', 'contextmenu']
interface VTooltipInstance {
  id: string
  vm: ComponentInternalInstance
  props: TooltipProps
  cleanup: () => void
  cleanupListeners?: () => void
  destroy: () => void
  fragment: DocumentFragment
}

const instances = new WeakMap<HTMLElement, VTooltipInstance>()

type TooltipElement = HTMLElement & {
  _tooltipContainer?: HTMLElement
  _tooltipVm?: ComponentInternalInstance
}
function needsUpdate(oldProps: any, newValue: any) {
  return !isEqual(oldProps, parseBindingValue(newValue))
}

function parseBindingValue(value: string | TooltipBindingValue) {
  return typeof value === 'string' ? { content: value } : value
}
// 处理触发器和警告 ,并返回最终的触发器
function handleTriggerAndWarn(binding: DirectiveBinding<TooltipBinding, TriggerKeys, Placement>) {
  const { modifiers } = binding
  const triggers = Object.keys(modifiers) as TriggerKeys[]
  // 传入的触发器
  const inputTriggers = triggers.filter(
    k => modifiers[k as TriggerKeys],
  ) as TriggerKeys[]
  const isInvalidTrigger = inputTriggers.some(
    t => !TRIGGER_KEYS.includes(t),
  ) || inputTriggers.length === 0
  // 警告 如果触发器填写错误 则警告
  if (isInvalidTrigger) {
    if (inputTriggers.length === 0) {
      consoleWarn(
        `v-tooltip: 没有填写触发器,则默认为hover,请使用 hover,click,focus,contextmenu 中的一个`,
      )
    }
    else {
      // 不属于TRIGGER_KEYS的触发器
      const invalidTriggers = inputTriggers.filter(
        t => !TRIGGER_KEYS.includes(t),
      )
      consoleWarn(
        `v-tooltip:${invalidTriggers.join(',')} 是无效的触发器,请使用 hover,click,focus,contextmenu 中的一个`,
      )
    }
  }
  // const { theme } = binding.value as TooltipBindingValue
  const finalTrigger = isInvalidTrigger ? 'hover' : inputTriggers[0]
  return finalTrigger
}

// 处理props参数
function handleProps(el: TooltipElement, binding: DirectiveBinding<TooltipBinding, TriggerKeys, Placement>, trigger: TriggerKeys): { popperProps: PopperProps, props: TooltipProps } {
  const { arg: placement = 'top' } = binding
  const props: TooltipProps = {
    placement,
    trigger,
    activator: el,
    arrow: true,
    ...(typeof binding.value === 'string'
      ? { content: binding.value }
      : binding.value),
  }
  const closeOnClickOutside = unref(props.trigger) !== 'hover'
  const popperOptions = {
    placement: props.placement,
    modifiers: createTooltipModifiers({
      arrow: props.arrow ?? false,
      offset: props.offset,
    }),
    ...props.popperOptions,
  }
  const popperStyle = {
    '--jv-popper-bg-color': '#323232',
    '--jv-popper-border-color': '#4d4d4d',
    ...(props.popperStyle ?? {}),
  }
  const popperProps = mapTooltipToPopperProps(
    {
      ...props,
    },
    {
      reference: el,
      options: popperOptions,
      closeOnClickOutside,
      dataPopper: `tooltip-${el._tooltipVm?.uid}`,
      style: popperStyle,
      manual: true,
    },
  )
  return {
    popperProps,
    props,
  }
}

function createTooltipInstance(
  el: HTMLElement,
  binding: DirectiveBinding<TooltipBinding, TriggerKeys, Placement>,
  tooltipId: string,
): {
    instance: VTooltipInstance
    container: HTMLElement
  } {
  // 处理触发器和props
  const finalTrigger = handleTriggerAndWarn(binding)
  const { popperProps, props } = handleProps(el, binding, finalTrigger)
  // 获取容器
  const { element: container, release } = containerManager.getContainer({
    namespace: 'tooltip-container',
  })
  // 创建Vue实例
  const vm = h(
    JvPopper,
    {
      ...popperProps,
      appendTo: `#${container.id}`,
      key: tooltipId,
    },
    {
      default: () => createVNode(JvTooltipContent, {
        renderContent: props.content,
        trigger: finalTrigger,
        openFinal: () => {
          _openFinal()
        },
        closeFinal: () => {
          _closeFinal()
        },
      }),
    },
  )
  // 渲染到DOM
  const fragment = document.createDocumentFragment()
  render(vm, fragment as any)
  container.appendChild(fragment)

  // 事件处理
  const { openFinal, closeFinal, toggleFinal, cleanup } = onDebounceToggleHandler({
    open: () => vm.component?.exposed?.show(),
    close: () => vm.component?.exposed?.hide(),
    toggle: () => vm.component?.exposed?.toggle(),
    openDelay: props.openDelay,
    closeDelay: props.closeDelay,
  })
  function _openFinal() {
    openFinal()
  }
  function _closeFinal() {
    closeFinal()
  }

  // 绑定触发器事件
  const { attachEvents, applyEffect, detachEvents } = setupTriggerEventsAndApplyEffect({
    bemClass: 'jv-tooltip__trigger',
    attributes: {
      'data-tooltip-trigger': tooltipId,
    },
    trigger: finalTrigger,
    onOpen: openFinal,
    onClose: closeFinal,
    onToggle: toggleFinal,
  })
  applyEffect(el)
  attachEvents(el)
  return {
    instance: {
      vm: vm.component!,
      props,
      id: tooltipId,
      fragment,
      destroy: () => {
        render(null, fragment as any)
        fragment.textContent = ''
        release()
      },
      cleanup,
      cleanupListeners: () => detachEvents(el),
    },
    container,
  }
}

/**
 * warn: 指令的hooks函数中无法获取到 app 传入的provide
 * 1. 无法使用provide 传入的theme
 * 2. 无法使用useTheme 获取theme
 * 只能进行常规的dom操作
 *
 * 要想实现theme,可以将theme作为参数传入指令
 *
 */
const TooltipDirective: Directive<TooltipElement, TooltipBinding, TriggerKeys, Placement> = {
  mounted(el, binding) {
    const tooltipId = `tooltip-${uuidv4().slice(0, 7)}`
    const { instance, container } = createTooltipInstance(el, binding, tooltipId)
    instances.set(el, instance)
    el._tooltipContainer = container
    el._tooltipVm = instance.vm
  },

  updated(el, binding) {
    const oldInstance = instances.get(el)
    if (oldInstance && needsUpdate(oldInstance.props, binding.value)) {
      oldInstance.destroy()
      const { instance, container } = createTooltipInstance(el, binding, oldInstance.id)
      instances.set(el, instance)
      el._tooltipContainer = container
      el._tooltipVm = instance.vm
    }
  },

  beforeUnmount(el) {
    const instance = instances.get(el)
    if (instance) {
      instance.destroy()
      instances.delete(el)
    }
  },
}

export const Tooltip = TooltipDirective
