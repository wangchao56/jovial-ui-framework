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
  // dashed: false,
  // margin: '16px',
  // orientation: 'horizontal'
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
</script>

<template>
  <hr :class="[bem.b(), bem.is('dashed', dashed), bem.is('title', !!title)]" :data-title="title">
</template>

<style scoped>
  hr {
  --jv-divider-bg-color: #c8c8c8;
  width: v-bind(lengthComputed);
  border: none;
  /* background-color: var(--jv-color-info-light); */
  overflow: visible;
  text-align: v-bind(titlePosition);
  height: 0px;
  margin: 4px 0;
  /* 高度使用border */
  border-top: 0.5px solid;
  border-color: var(--jv-divider-bg-color);
  position: relative;
  --jv-divider-title-color: #333;
  --jv-divider-gap: 16px;
  transform-origin: center;
  transform: v-bind(directionTransform);
}
.is-dashed {
  border-style: dashed;
}
.is-title {
  margin: 9px 0;
  &::after {
    content: attr(data-title);
    background: #dddddd;
    position: absolute;
    color: var(--jv-color-info-light);
    top: 50%;
    left: v-bind(leftGap);
    width: max-content;
    transform: translate(-50%, -50%);
    font-size: 12px;
    line-height: 18px;
  }
}
</style>
