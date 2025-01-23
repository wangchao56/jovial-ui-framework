<script setup lang="ts">
import type { JvDividerProps } from './JvDivider'
import { createNamespace } from '@jovial/utils'

defineOptions({ name: 'JvDivider' })
const props = withDefaults(defineProps<JvDividerProps>(), {
  title: '',
  titlePosition: 'center',
  color: '',
  direction: 'horizontal',
  strokeWidth: 1,
  length: 'full',
  dashed: false,
  margin: 16,
  titleBackground: '#ffffff',
})
const bem = createNamespace('divider')
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
}))
</script>

<template>
  <hr
    :class="[bem.b(), bem.is('dashed', dashed), bem.is('title', !!title)]"
    :data-title="title"
    :style="dividerStyle"
  >
</template>

<style scoped>
hr {
  --jv-divider-bg-color: #c8c8c8;
  --jv-divider-margin: 16px;
  --jv-divider-stroke-width: 1px;
  --jv-divider-title-bg: #ffffff;

  width: v-bind(lengthComputed);
  border: none;
  overflow: visible;
  text-align: v-bind(titlePosition);
  height: 0px;
  margin: var(--jv-divider-margin) 0;
  border-top: var(--jv-divider-stroke-width) solid;
  border-color: var(--jv-divider-bg-color);
  position: relative;
  transform-origin: center;
  transform: v-bind(directionTransform);
}

.is-dashed {
  border-style: dashed;
}

.is-title {
  &::after {
    content: attr(data-title);
    background: var(--jv-divider-title-bg);
    position: absolute;
    color: var(--jv-divider-bg-color);
    top: 50%;
    left: v-bind(leftGap);
    padding: 0 10px;
    width: max-content;
    transform: translate(-50%, -50%);
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
