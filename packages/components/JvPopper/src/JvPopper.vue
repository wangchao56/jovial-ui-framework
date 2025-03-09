<script setup lang="ts">
import type { PopperEmits, PopperExpose, PopperSlots } from './JvPopper'
import { useZIndex } from '@jienix/jovial-composables'
import { createNamespace } from '@jienix/utils'
import { createPopper, type Instance, type Options, type PositioningStrategy } from '@popperjs/core'
import { onClickOutside, type OnClickOutsideOptions } from '@vueuse/core'
import { isObject } from 'lodash-es'
import { computed, onMounted, onUnmounted, ref, unref, watch } from 'vue'
import { popperProps } from './JvPopper'

// 1. 定义组件名称
defineOptions({ name: 'JvPopper', inheritAttrs: true })

// 2. 完善 props
const { reference, closeOnClickOutside, options, arrow, class: className, style, manual, openDelay, closeDelay, appendTo, disableAnimation } = defineProps(popperProps)
const emit = defineEmits<PopperEmits>()
defineSlots<PopperSlots>()

const bem = createNamespace('popper')
// 5. 定义引用和插槽
const popperNode = ref<HTMLElement | null>(null)
let popperInstance: Instance | null = null

// 显示
const visible = defineModel<boolean>('modelValue', { required: true })
const zIndex = useZIndex()

const finalOptions = computed<Partial<Options>>(() => ({
  strategy: 'fixed' as PositioningStrategy,
  placement: 'bottom',
  ...unref(options),
  modifiers: [
    ...(unref(options)?.modifiers || []),
    ...(arrow
      ? [
          {
            name: 'arrow',
            options: {
              element: '#jv-popper-arrow',
              padding: 5,
            },
          },
        ]
      : []),
  ],
}))

// 处理点击事件
function handleClick(evt: MouseEvent) {
  emit('click', evt)
}

// 监听visible变化
watch(() => visible.value, (newVal) => {
  if (newVal) {
    if (reference && popperNode.value) {
      popperInstance = createPopper(reference, popperNode.value, finalOptions.value)
    }
    else {
      destroy()
    }
  }
  // error:如果visible为false, 在此处不能执行popperInstance?.destroy()
  // 因为此时popperInstance为null
}, { flush: 'post' })

const clearup = ref<() => void>()
onMounted(() => {
  if (unref(closeOnClickOutside)) {
    const ignore = reference instanceof HTMLElement ? [reference] : []
    let outsideOptions: OnClickOutsideOptions = {
      ignore,
      detectIframe: true,
      capture: true,
    }
    if (isObject(unref(closeOnClickOutside))) {
      outsideOptions = {
        ...outsideOptions,
        ...unref(closeOnClickOutside) as OnClickOutsideOptions,
      }
    }
    clearup.value = onClickOutside(popperNode, (e) => {
      visible.value = false
      emit('clickOutside', visible.value, e)
    }, outsideOptions)
  }
  else {
    clearup.value = undefined
  }
})

onUnmounted(() => {
  destroy()
  // 执行清理函数
  clearup.value?.()
})

function destroy() {
  popperInstance?.destroy()
  popperInstance = null
}

function update() {
  popperInstance?.forceUpdate()
}

// 延时控制函数
let openTimer: ReturnType<typeof setTimeout> | null = null
let closeTimer: ReturnType<typeof setTimeout> | null = null

function clearTimers() {
  if (openTimer) {
    clearTimeout(openTimer)
    openTimer = null
  }
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
}

function show() {
  if (manual) {
    clearTimers()
    if (openDelay > 0) {
      openTimer = setTimeout(() => {
        visible.value = true
      }, openDelay)
    }
    else {
      visible.value = true
    }
  }
}

function hide() {
  if (manual) {
    clearTimers()
    if (closeDelay > 0) {
      closeTimer = setTimeout(() => {
        visible.value = false
      }, closeDelay)
    }
    else {
      visible.value = false
    }
  }
}

function toggle() {
  if (manual) {
    if (visible.value) {
      hide()
    }
    else {
      show()
    }
  }
}

defineExpose<PopperExpose>({
  root: popperNode,
  update,
  destroy,
  popperInstance,
  show,
  hide,
  toggle,
  visible,
})

const id = useId()

// 进入前执行
function beforeEnterHandler(_el: Element) {
  emit('beforeEnter')
  update()
}
// 进入后执行
function afterEnterHandler(_el: Element) {
  emit('open', true)
}
// 离开前执行
function beforeLeaveHandler(_el: Element) {
  emit('beforeLeave')
}

// 离开后执行
function afterLeaveHandler(_el: Element) {
  emit('close', false)
  destroy()
}

const popperStyle = computed(() => ({
  zIndex: zIndex.current.value,
  ...style,
}))

// 开启关闭延时该变更成动画的执行时间
const openanimationduration = computed(() => disableAnimation ? 0 : openDelay)
const closeanimationduration = computed(() => disableAnimation ? 0 : closeDelay)
</script>

<template>
  <Transition
    :name="transition" @before-enter="beforeEnterHandler" @before-leave="beforeLeaveHandler"
    @after-enter="afterEnterHandler" @after-leave="afterLeaveHandler"
  >
    <Teleport :to="appendTo" :disabled="!visible">
      <div
        v-if="visible" v-bind="$attrs" :id="id" ref="popperNode" :class="[bem.b(), className]" :style="popperStyle"
        :data-popper="dataPopper" @click="handleClick"
      >
        <slot />
        <div v-if="arrow" id="jv-popper-arrow" data-popper-arrow class="jv-popper-arrow" />
      </div>
    </Teleport>
  </Transition>
</template>

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
}

/* 进入阶段的过渡效果 */
.fade-enter-active {
  transition-timing-function: ease-in;
  transition-duration: calc(v-bind(openanimationduration) * 1ms);
}

.fade-leave-active {
  transition-timing-function: ease;
  transition-duration: calc(v-bind(closeanimationduration) * 1ms);
}

/* 进入开始时的样式 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 进入结束时的样式（通常是目标样式，但在这种情况下与 .fade-enter-active 相同） */
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* 箭头样式 */
.jv-popper-arrow {
  position: absolute;
  width: 10px;
  height: 10px;
  background: inherit;
  visibility: visible;
  z-index: -1;
}

.jv-popper-arrow::before {
  position: absolute;
  width: 10px;
  height: 10px;
  background: inherit;
  visibility: visible;
  content: '';
  transform: rotate(45deg);
}

[data-popper-placement^='top'] .jv-popper-arrow {
  bottom: -5px;
}

[data-popper-placement^='bottom'] .jv-popper-arrow {
  top: -5px;
}

[data-popper-placement^='left'] .jv-popper-arrow {
  right: -5px;
}

[data-popper-placement^='right'] .jv-popper-arrow {
  left: -5px;
}
</style>
