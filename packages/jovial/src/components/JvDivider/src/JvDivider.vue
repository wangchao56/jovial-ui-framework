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

<style lang="post" scoped>
hr {
  --jv-divider-bg-color: #c8c8c8;
  --jv-divider-margin: 16px;
  --jv-divider-stroke-width: 1px;
  --jv-divider-title-bg: #fff;

  position: relative;
  width: v-bind(lengthComputed);
  height: 0;
  margin: var(--jv-divider-margin) 0;
  border: none;
  text-align: v-bind(titlePosition);
  transform: v-bind(directionTransform);
  overflow: visible;
  border-top: var(--jv-divider-stroke-width) solid;
  border-color: var(--jv-divider-bg-color);
  transform-origin: center;
}

.is-dashed {
  border-style: dashed;
}

.is-title {
  &::after {
    position: absolute;
    top: 50%;
    left: v-bind(leftGap);
    width: max-content;
    padding: 0 10px;
    background: var(--jv-divider-title-bg);
    color: var(--jv-divider-bg-color);
    font-size: 14px;
    line-height: 20px;
    transform: translate(-50%, -50%);
    content: attr(data-title);
  }
}
</style>
