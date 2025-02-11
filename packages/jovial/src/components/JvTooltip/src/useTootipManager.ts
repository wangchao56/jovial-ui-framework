import type { Ref } from 'vue'
import { debounce } from 'lodash-es'
import { ref, shallowReactive } from 'vue'
import { getTriggerHandlers, type TooltipProps, type TriggerKeys } from './tooltip'

export interface UseTooltipOptions extends TooltipProps {
  open?: () => void
  close?: () => void
  toggle?: () => void
}

export interface TooltipManager {
  show: () => void
  hide: () => void
}

export interface DebounceToggleHandlerOptions {
  open?: () => void
  close?: () => void
  toggle?: () => void
  openDelay?: number
  closeDelay?: number
}

export interface DebounceToggleHandler {
  openFinal: () => void
  closeFinal: () => void
  toggleFinal: () => void
  cleanup: () => void
}
/**
 * 防抖控制
 * @param options
 * @returns
 */
export function onDebounceToggleHandler(options: DebounceToggleHandlerOptions): DebounceToggleHandler {
  const { openDelay, closeDelay } = options
  const openHandler = options.open || (() => {})
  const closeHandler = options.close || (() => {})
  const toggleHandler = options.toggle || (() => {})
  // 当前状态
  const isOpen = ref(false)
  // 防抖控制
  const openDebounce = debounce(openHandler, unref(openDelay) || 0)
  const closeDebounce = debounce(closeHandler, unref(closeDelay) || 250)
  const toggleDebounce = debounce(toggleHandler, isOpen.value ? unref(closeDelay) || 250 : unref(openDelay) || 0)
  const openFinal = () => {
    isOpen.value = true
    closeDebounce.cancel()
    openDebounce()
  }

  const closeFinal = () => {
    isOpen.value = false
    openDebounce.cancel()
    closeDebounce()
  }

  const toggleFinal = () => {
    isOpen.value = !isOpen.value
    openDebounce.cancel()
    closeDebounce.cancel()
    toggleDebounce()
  }
  // 卸载时取消防抖
  const cleanup = () => {
    openDebounce.cancel()
    closeDebounce.cancel()
    toggleDebounce.cancel()
  }

  return {
    openFinal,
    closeFinal,
    toggleFinal,
    cleanup,
  }
}
interface TriggerSetupOptions {
  /** BEM 样式类名 */
  bemClass: string
  /** 需要设置的DOM属性 */
  attributes: Record<string, string>
  trigger: TriggerKeys
  onOpen: () => void
  onClose: () => void
  onToggle?: () => void
}

interface TriggerSetupReturn {
  attachEvents: (el: HTMLElement | Ref<HTMLElement | null>) => void
  applyEffect: (el: HTMLElement | Ref<HTMLElement | null>) => void
  detachEvents: (el: HTMLElement | Ref<HTMLElement | null>) => void
  eventListeners: Record<string, EventListener>
}

/**
 * 触发器设置
 * @param options
 * @returns
 */
export function setupTriggerEventsAndApplyEffect(options: TriggerSetupOptions): TriggerSetupReturn {
  const eventListeners = shallowReactive<Record<string, EventListener>>({})
  function applyEffect(el: HTMLElement | Ref<HTMLElement | null>) {
    unref(el)?.classList.add(options.bemClass)
    Object.entries(options.attributes).forEach(([key, value]) => {
      unref(el)?.setAttribute(key, value)
    })
  }
  const attachEvents = (el: HTMLElement | Ref<HTMLElement | null>) => {
    const reference = unref(el) as HTMLElement
    if (!reference)
      return
    const handlers = getTriggerHandlers(options.trigger)
    handlers.forEach(([startEvent, endEvent]) => {
      const startHandler: EventListener = (e: Event) => {
        // 事件类型
        e.preventDefault()
        startEvent === 'mouseenter' ? options.onOpen() : options.onToggle ? options.onToggle() : options.onOpen()
      }
      const endHandler: EventListener = (e: Event) => {
        e.preventDefault() // 阻止默认行为
        endEvent === 'mouseleave' ? options.onClose() : options.onClose()
      }
      // 添加事件监听器
      eventListeners[startEvent] = startHandler
      unref(el)?.addEventListener(startEvent, startHandler)
      // 如果存在结束事件，则添加结束事件监听器
      if (endEvent && endHandler) {
        eventListeners[endEvent] = endHandler
        unref(el)?.addEventListener(endEvent, endHandler)
      }
    })
  }

  const detachEvents = (el: HTMLElement | Ref<HTMLElement | null>) => {
    const reference = unref(el) as HTMLElement
    if (!reference)
      return
    Object.keys(eventListeners).forEach((event) => {
      unref(el)?.removeEventListener(event, eventListeners[event])
    })
    Object.keys(eventListeners).forEach(key => delete eventListeners[key])
  }

  return {
    attachEvents,
    applyEffect,
    detachEvents,
    eventListeners,
  }
}
export const defaultTooltipProps: Partial<TooltipProps> = {
  trigger: 'hover',
  content: '',
  placement: 'top',
  openDelay: 250,
  closeDelay: 250,
  arrow: true,
  popperOptions: {},
  disableAnimation: false,
}
