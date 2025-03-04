<script setup lang='ts'>
import type { PopperExpose, ReferenceType } from '@components/JvPopper'
import type { Options } from '@popperjs/core'
import type { VNodeChild } from 'vue'
import type { TooltipEmits, TooltipExpose, TooltipProps, TooltipSlots } from './tooltip'
import type { JvTooltipTriggerProps } from './trigger'
import JvPopper from '@components/JvPopper'
import { consoleWarn, createNamespace, getSlotsFirstChild, isTextNode, useContainerManager } from '@jienix/utils'
import { useParentElement } from '@vueuse/core'
import JvTooltipContent from './content.vue'
import JvTooltipTrigger from './JvTrigger.vue'
import JvTooltipRoot from './root.vue'
import { createTooltipModifiers, mapTooltipToPopperProps } from './tooltip-utils'
import { onDebounceToggleHandler } from './useTootipManager'

defineOptions({ name: 'JvTooltip' })
const props = withDefaults(defineProps<TooltipProps>(), {
  trigger: 'hover',
  content: '',
  placement: 'top',
  openDelay: 250,
  closeDelay: 250,
  arrow: true,
  popperOptions: () => ({}),
  disableAnimation: false,
})
const emit = defineEmits<TooltipEmits>()
const slots = defineSlots<TooltipSlots>()

const tootipId = useId()
const bem = createNamespace('tooltip')
const referenceRef = ref<ReferenceType | null>(null)
const isOpen = useModel(props, 'visible')
const JvpopperRef = ref<PopperExpose>()
const containerManager = useContainerManager()
const container = containerManager.getContainer({
  namespace: 'tooltip-container',
})
const appendTo = computed(() => `#${container.element.id}`)
// 这种结构可使每个属性都具有响应性?
const { activator, openDelay, closeDelay, content, trigger, disableAnimation } = toRefs(props) // 解构activator 并使用toRefs的作用是 当activator变化时，会触发响应式更新

const closeOnClickOutside = computed(() => unref(trigger) !== 'hover')
const popperOptions = computed<Partial<Options>>(() => ({
  placement: props.placement,
  modifiers: createTooltipModifiers({ arrow: props.arrow, offset: props.offset }),
  ...props.popperOptions,
}))
const popperStyle = computed(() => ({
  '--jv-popper-bg-color': '#323232',
  '--jv-popper-border-color': '#4d4d4d',
  ...props.popperStyle ?? {},
}))
const popperProps = computed(() => mapTooltipToPopperProps({
  ...props,
  openDelay: disableAnimation.value ? unref(openDelay) / 2 : unref(openDelay),
  closeDelay: disableAnimation.value ? unref(closeDelay) / 2 : unref(closeDelay),
}, {
  reference: referenceRef.value,
  options: popperOptions.value,
  closeOnClickOutside: closeOnClickOutside.value,
  manual: true,
  dataPopper: `tooltip-${tootipId}`,
  style: popperStyle.value,
}))

// 打开
function open() {
  JvpopperRef.value?.show()
}
function close() {
  JvpopperRef.value?.hide()
}
function toggle() {
  JvpopperRef.value?.toggle()
}
const { openFinal, closeFinal, toggleFinal, cleanup } = onDebounceToggleHandler({
  open,
  close,
  toggle,
  openDelay: unref(openDelay),
  closeDelay: unref(closeDelay),
})
// 监听isOpen的变化
watch(isOpen, (val) => {
  if (val) {
    openFinal()
  }
  else {
    closeFinal()
  }
})

const renderContent = computed(() => content.value || slots.default || '')

// 获取插槽, 确保只有一个子节点 ,如果有多个子节点, 打印警告信息
if (slots.default?.().length > 1) {
  consoleWarn('JvTooltip: 插槽只能有一个子节点')
}
// 获取父元素
const parentDom = useParentElement()

// 修改后
const firstChild = computed<VNodeChild>(() => getSlotsFirstChild(slots.default))
const isTriggerTextNode = computed<boolean>(() => {
  return isTextNode(firstChild)
})
const triggerProps = computed<JvTooltipTriggerProps>(() => ({
  isTriggerTextNode: isTriggerTextNode.value,
  firstChild: firstChild.value,
  activator: activator.value,
  tootipId,
  referenceRef,
  setReference: (el: HTMLElement | null) => {
    referenceRef.value = el
  },
  bem,
  trigger: unref(trigger),
  onOpen: openFinal,
  onClose: closeFinal,
  onToggle: toggleFinal,
  parentDom: parentDom as Ref<HTMLElement>,
}))
function toggleHandler(val: boolean) {
  isOpen.value = val
  emit('visibleChange', val)
}
function clickOutsideHandler(val: boolean, _evt: MouseEvent) {
  isOpen.value = val
  emit('visibleChange', val)
}
const popperEvents = {
  open: toggleHandler,
  close: toggleHandler,
  clickOutside: clickOutsideHandler,
}

onBeforeUnmount(() => {
  cleanup()
})
defineExpose<TooltipExpose>({
  popperRef: JvpopperRef,
  /** @description 显示  */
  show: () => {
    JvpopperRef.value?.show()
  },
  /** @description 隐藏  */
  hide: () => {
    JvpopperRef.value?.hide()
  },
})
</script>

<template>
  <JvTooltipRoot>
    <JvTooltipTrigger v-bind="triggerProps">
      <slot />
    </JvTooltipTrigger>
    <JvPopper
      ref="JvpopperRef"
      manual
      :append-to="appendTo"
      v-bind="popperProps"
      v-on="popperEvents"
    >
      <template #default>
        <JvTooltipContent :render-content="renderContent" :trigger="trigger" :open-final="openFinal" :close-final="closeFinal" />
      </template>
    </JvPopper>
  </JvTooltipRoot>
</template>
