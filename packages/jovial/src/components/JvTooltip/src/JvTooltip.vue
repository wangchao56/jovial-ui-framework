<script setup lang='ts'>
import type { ObjectEmitsOptions } from 'vue'
import type { TooltipEmits, TooltipExpose, TooltipProps, TooltipSlots } from './tooltip'
import { useClickOutside } from '@/composables'
import JvRenderVNodeContent from '@components/internal/render-vnode-content.setup'
import { createNamespace } from '@jovial/utils'
import { createPopper, type Instance } from '@popperjs/core'
import flip from '@popperjs/core/lib/modifiers/flip'
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow'
import { debounce } from 'lodash-es'

defineOptions({ name: 'JvTooltip' })
const props = withDefaults(defineProps<TooltipProps>(), {
  trigger: 'hover',
  content: '',
  manual: false,
  placement: 'top',
  openDelay: 0,
  closeDelay: 0,
  transition: 'fade',
  popperOptions: () => ({}),
})
const emit = defineEmits<TooltipEmits>()
defineSlots<TooltipSlots>()
const bem = createNamespace('tooltip')
const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
const tooltipNode = ref<HTMLElement>()
const isOpen = ref<boolean>(false)
let popperInstance: Instance | null = null
let events: ObjectEmitsOptions = reactive({})
let outerEvents: ObjectEmitsOptions = reactive({})
const popperOptions = computed(() => ({
  placement: props.placement,
  modifiers: [
    flip,
    preventOverflow,
    {
      name: 'offset',
      options: { offset: [0, 8] },
    },
  ],
  ...props.popperOptions,
}))
function open() {
  isOpen.value = true
  emit('visibleChange', true)
}
function close() {
  isOpen.value = false
  emit('visibleChange', false)
}

const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)

function openFinal() {
  closeDebounce.cancel()
  openDebounce()
}
function closeFinal() {
  openDebounce.cancel()
  closeDebounce()
}

function togglePopper(e: Event) {
  e.stopPropagation() // 阻止冒泡
  e.preventDefault() // 阻止默认行为
  if (isOpen.value) {
    closeFinal()
  }
  else {
    openFinal()
  }
}
useClickOutside(tooltipNode, () => {
  if (props.trigger !== 'hover' && isOpen.value && !props.manual) {
    closeFinal()
  }
})

/** 批量添加事件 */
function attachEvents() {
  events = {}
  outerEvents = {}
  if (props.manual) { // 手动触发时不绑定事件
    // 多次点击时触发提示 （仅在开发阶段）
    if (process.env.NODE_ENV === 'development') {
      events.click = () => {
        console.warn('使用manual属性控制显示隐藏, 请使用show/hide方法控制显示隐藏.')
      }
    }
  }
  else {
    switch (props.trigger) {
      case 'hover':
        events.mouseenter = openFinal
        Object.assign(outerEvents, {
          mouseleave: (e: Event) => {
            e.preventDefault() // 阻止默认行为
            closeFinal()
          },
        })

        break
      case 'click':
        events.click = togglePopper
        break
      case 'focus':
        events.focus = togglePopper
        break
      case 'contextmenu':
        Object.assign(events, {
          contextmenu: (e: Event) => {
            e.preventDefault() // 阻止默认行为
            togglePopper(e)
          },
        })
        break
    }
  }
}
watchEffect(() => {
  attachEvents()
})

watch(isOpen, (newVal) => {
  if (newVal) {
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
    }
  }
  else {
    popperInstance?.destroy()
  }
}, { flush: 'post' })

onUnmounted(() => {
  popperInstance?.destroy()
})

function show() {
  props.manual && openFinal()
}
function hide() {
  props.manual && closeFinal()
}

defineExpose<TooltipExpose>({
  show,
  hide,
})
</script>

<template>
  <div ref="tooltipNode" :class="bem.b()" v-on="outerEvents">
    <div ref="triggerNode" :class="bem.e('trigger')" v-on="events">
      <slot />
    </div>
    <Transition :name="transition">
      <div v-if="isOpen" id="popper" ref="popperNode" :class="bem.e('popper')">
        <slot v-if="$slots.content" name="content" />
        <template v-else-if="content">
          {{ content }}
        </template>
        <JvRenderVNodeContent v-else :render="$slots.default" />
        <div id="jv-arrow" data-popper-arrow />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
