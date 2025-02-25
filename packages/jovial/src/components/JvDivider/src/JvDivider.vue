<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { jvDividerProps } from './JvDivider'

defineOptions({ name: 'JvDivider' })
const props = defineProps(jvDividerProps)
const bem = createNamespace('divider')
const dividerRef = useTemplateRef('divider')
const leftGap = computed(() => {
  switch (props.titlePosition) {
    case 'left':
      return '20%'
    case 'center':
      return '50%'
    case 'right':
      return '80%'
    default:
      return '50%'
  }
})

const directionTransform = computed(() => {
  switch (props.direction) {
    case 'horizontal':
      return 'rotateZ(0deg)'
    case 'vertical':
      return 'rotateZ(90deg)'
    default:
      return 'rotateZ(0deg)'
  }
})

const lengthComputed = computed(() => {
  if (props.length === 'full') {
    return '100%'
  }
  return `${props.length}px`
})

const dividerStyle = computed(() => ({
  '--jv-divider-bg-color': props.color || '#c8c8c8',
  '--jv-divider-margin': `${props.margin}px`,
  '--jv-divider-stroke-width': `${props.strokeWidth}px`,
  '--jv-divider-title-bg': props.titleBackground,
  '--jv-divider-text-align': props.titlePosition,
  '--jv-divider-transform': directionTransform.value,
  '--jv-divider-width': lengthComputed.value,
  '--jv-divider-after-left': leftGap.value,
}))
defineExpose({
  // 暴露根元素
  root: dividerRef,
})
</script>

<template>
  <hr
    ref="divider" :class="[bem.b(), bem.is('dashed', dashed), bem.is('title', !!title)]" :data-title="title"
    :style="dividerStyle"
  >
</template>
