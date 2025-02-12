<script setup lang="ts">
import type { PopperEmits, PopperExpose, PopperProps, PopperSlots } from './popper'
import { useZIndex } from '@/composables'
import { createNamespace } from '@jovial/utils'
import { createPopper, type Instance, type Options, type PositioningStrategy } from '@popperjs/core'
import { onClickOutside, type OnClickOutsideOptions } from '@vueuse/core'
import { isObject } from 'lodash-es'
import { computed, ref } from 'vue'
// 1. 定义组件名称
defineOptions({ name: 'JvPopper', inheritAttrs: true })
// 2. 完善 props
const props = withDefaults(defineProps<PopperProps>(), {
  arrow: false,
  dataPopper: 'default-popper',
  openDelay: 150,
  closeDelay: 350,
  disableAnimation: false,
  closeOnClickOutside: false,
  manual: false,
  modelValue: false,
  appendTo: 'body',
})
const emit = defineEmits<PopperEmits>()
defineSlots<PopperSlots>()
const bem = createNamespace('popper')
// 5. 定义引用和插槽
const popperNode = ref<HTMLElement | null>(null)
let popperInstance: Instance | null = null
const { reference, closeOnClickOutside, options } = toRefs(props)
// 显示
const visible = useModel(props, 'modelValue')
const zIndex = useZIndex()
const finalOptions = computed<Partial<Options>>(() => ({
  strategy: 'fixed' as PositioningStrategy,
  placement: 'bottom',
  ...unref(options),
}))
watch(() => visible.value, (newVal) => {
  if (newVal) {
    if (reference.value && popperNode.value) {
      popperInstance = createPopper(reference.value, popperNode.value, finalOptions.value)
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
    const ignore = reference.value instanceof HTMLElement ? [reference.value] : []
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
defineExpose<PopperExpose>({
  root: popperNode,
  update,
  destroy,
  popperInstance,
  show: () => {
    if (props.manual) {
      visible.value = true
    }
  },
  hide: () => {
    if (props.manual) {
      visible.value = false
    }
  },
  toggle: () => {
    if (props.manual) {
      visible.value = !visible.value
    }
  },
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
  ...props.style,
}))
// 开启关闭延时该变更成动画的执行时间
const openAnimationDuration = computed(() => props.disableAnimation ? 0 : props.openDelay)
const closeAnimationDuration = computed(() => props.disableAnimation ? 0 : props.closeDelay)
</script>

<template>
  <Transition
    name="fade"
    @before-enter="beforeEnterHandler"
    @before-leave="beforeLeaveHandler"
    @after-enter="afterEnterHandler"
    @after-leave="afterLeaveHandler"
  >
    <Teleport defer :to="appendTo" :disabled="visible">
      <div
        v-if="visible"
        v-bind="$attrs"
        :id="id"
        ref="popperNode"
        :class="[bem.b(), props.class]"
        :style="popperStyle"
        :data-popper="props.dataPopper"
      >
        <slot />
        <div v-if="arrow" id="jv-popper-arrow" data-popper-arrow />
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
  transition-duration: calc(v-bind(openAnimationDuration) * 1ms);
}

.fade-leave-active {
  transition-timing-function: ease;
  transition-duration: calc(v-bind(closeAnimationDuration) * 1ms);
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
</style>
