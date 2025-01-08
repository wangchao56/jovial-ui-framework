<script setup lang="ts">
import { createNamespace, isArray, isNumber } from '@jovial/utils'
import { computed } from 'vue'
import { spaceProps } from './space'

defineOptions({ name: 'JvSpace' })
const props = defineProps(spaceProps)
const bem = createNamespace('space')

const spaceStyle = computed(() => {
  if (isNumber(props.size)) {
    return {
      '--space-size': `${props.size}px`,
    }
  }
  else if (isArray(props.size)) {
    return {
      '--space-size': props.size[0] ? `${props.size[0]}px` : 0,
      '--space-vertical-size': props.size[1] ? `${props.size[1]}px` : 0,
    }
  }
  switch (props.size) {
    case 'small':
      return { '--space-size': '8px' }
    case 'large':
      return { '--space-size': '24px' }
    case 'medium':
    default:
      return { '--space-size': '16px' }
  }
})
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.m(`align-${align}`),
      bem.m(`justify-${justify}`),
      bem.m(direction ?? 'horizontal'),
      bem.is('wrap', wrap),
      bem.is('inline', inline),
      // 自定义类
    ]"
    :style="spaceStyle"
  >
    <slot />
  </div>
</template>
