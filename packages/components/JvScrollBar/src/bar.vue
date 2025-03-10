<script setup lang="ts">
import type { JvBarEmits } from './bar'
import { createNamespace } from '@jienix/utils'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { jvBarProps } from './bar'

defineOptions({ name: 'JvBar', inheritAttrs: false })

const props = defineProps(jvBarProps)

const emit = defineEmits<JvBarEmits>()
const bem = createNamespace('scrollBar')
const thumb = ref<HTMLElement>()
const active = ref(false)
const startDrag = ref(false)
const startOffset = ref(0)
const cursorDown = ref(false)

const thumbStyle = computed(() => {
  const style: Record<string, string> = {}
  const translate = `translate${props.vertical ? 'Y' : 'X'}(${props.move}%)`

  style.transform = translate
  style[props.vertical ? 'height' : 'width'] = props.size || '0px'

  return style
})

function handleMouseDown(e: MouseEvent) {
  e.stopPropagation()
  active.value = true
  startDrag.value = true
  startOffset.value = props.vertical ? e.clientY : e.clientX
  cursorDown.value = true
}

function handleMouseUp() {
  startDrag.value = false
  cursorDown.value = false
  active.value = false
}

function handleMouseMove(e: MouseEvent) {
  if (!startDrag.value)
    return

  const offset = props.vertical
    ? e.clientY - startOffset.value
    : e.clientX - startOffset.value

  const parentElement = thumb.value?.parentElement
  if (!parentElement)
    return

  const thumbSize = props.vertical
    ? parentElement.offsetHeight
    : parentElement.offsetWidth

  const moveRatio = offset * (1 / props.ratio!) / thumbSize

  emit('scroll', moveRatio)
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
})
</script>

<template>
  <div
    :class="[
      bem.e('bar'),
      bem.is('vertical', vertical),
      bem.is('horizontal', !vertical),
      bem.is('active', active || always),
    ]" @mousedown="handleMouseDown"
  >
    <span ref="thumb" :class="bem.e('thumb')" :style="thumbStyle" />
  </div>
</template>
