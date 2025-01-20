<script setup lang='ts'>
import type { JvPopperInstance, ReferenceType } from '@components/JvPopper'
import type { ObjectEmitsOptions } from 'vue'
import type { TooltipEmits, TooltipExpose, TooltipProps, TooltipSlots } from './tooltip'
import { useClickOutside } from '@/composables'
import JvPopper from '@components/JvPopper'
import { createNamespace } from '@jovial/utils'
import { debounce, throttle } from 'lodash-es'
import '../style/jv-tooltip.css'

defineOptions({ name: 'JvTooltip' })
const props = withDefaults(defineProps<TooltipProps>(), {
  trigger: 'hover',
  content: '',
  manual: false,
  placement: 'top',
  openDelay: 0,
  closeDelay: 0,
  arrow: true,
  // disabled: false,
  // transition: 'fade',
  popperOptions: () => ({}),
})
const emit = defineEmits<TooltipEmits>()
const slots = defineSlots<TooltipSlots>()
const bem = createNamespace('tooltip')
const triggerNode = ref<ReferenceType>()
const tooltipNode = ref<HTMLElement>()
const isOpen = ref<boolean>(false)
const JvpopperRef = ref<JvPopperInstance>()

let events: ObjectEmitsOptions = reactive({})
let outerEvents: ObjectEmitsOptions = reactive({})
const popperOptions = computed(() => ({
  placement: props.placement,
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
const closeDebounce = throttle(close, props.closeDelay)

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
        outerEvents = Object.assign(outerEvents, {
          mouseleave: (e: Event) => {
            e.stopPropagation() // 阻止冒泡
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

function show() {
  props.manual && openFinal()
}
function hide() {
  props.manual && closeFinal()
}

const renderContent = computed(() => props.content || slots.content || slots.default || '')

defineExpose<TooltipExpose>({
  /** @description 显示  */
  show,
  hide,
})
</script>

<template>
  <div ref="tooltipNode" :class="bem.b()" v-on="outerEvents">
    <div ref="triggerNode" :class="bem.e('trigger')" v-on="events">
      <slot />
    </div>
    <JvPopper ref="JvpopperRef" v-model="isOpen" :reference="triggerNode" :options="popperOptions" :content="renderContent" :arrow="arrow" />
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
