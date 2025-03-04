<script setup lang="ts">
import type { JvOverlayEmits, JvOverlayProps, JvOverlaySlots } from './JvOverlay'
import { createNamespace } from '@jienix/utils'
import '../style/style.css'

defineOptions({ name: 'JvOverlay' })
const props = withDefaults(defineProps<JvOverlayProps>(), {
  lockScroll: true,
  contained: false,
  closeOnClickOverlay: true,
})
const emit = defineEmits<JvOverlayEmits>()
defineSlots<JvOverlaySlots>()
const bem = createNamespace('overlay')
/**
 * TODO: 添加注释说明组件用法和属性等。
 * 定位:fixed; 层级:100; 遮罩层;
 *
 */
const overlayRef = ref<HTMLDivElement>()
const parentElement = ref<HTMLElement>()
const visible = useModel(props, 'modelValue')
function clickOverlay(_e: MouseEvent) {
  if (!props.closeOnClickOverlay) {
    return
  }
  visible.value = false
  emit('closed')
}

onMounted(() => {
  // 获取遮罩层的父元素 ,如果父元素的position：relative; 则遮罩层会相对于父元素定位
  if (props.lockScroll) {
    document.body.style.overflow = 'hidden'
  }
  else {
    document.body.style.overflow = 'auto'
  }
})

watch(overlayRef, (val) => {
  if (val) {
    parentElement.value = overlayRef.value?.parentElement ?? document.body
    if (
      parentElement.value.computedStyleMap().get('position')?.toString() === 'relative'
    ) {
      overlayRef.value!.style.position = 'absolute'
    }
    else {
      overlayRef.value!.style.position = 'fixed'
    }
  }
}, { flush: 'post' })

onUnmounted(() => {
  document.body.style.overflow = 'auto'
})

function afterEnter() {
  emit('update:modelValue', true)
  emit('opened')
}

function afterLeave() {
  emit('update:modelValue', false)
  emit('closed')
}
</script>

<template>
  <Transition
    name="overlay-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave"
  >
    <div v-if="visible" ref="overlayRef" :style="overlayStyle" :class="[bem.b(), overlayClass]" @click.stop="clickOverlay">
      <slot />
    </div>
  </Transition>
</template>

<style lang="css" scoped>
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: background-color 0.3s;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  background-color: transparent !important;
}
</style>
