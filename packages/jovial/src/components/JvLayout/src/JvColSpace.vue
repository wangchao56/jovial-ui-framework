<script lang="ts" setup>
import type { JvColSpaceProps } from './type'
import { computed } from 'vue'
import JvSpace from '../../JvSpace/src/space.vue'
import JvCol from './JvCol.vue'

defineOptions({
  name: 'JvColSpace',
})

const props = withDefaults(defineProps<JvColSpaceProps>(), {
  span: 24,
  offset: 0,
  spaceAlign: 'center',
  spaceJustify: 'start',
  spaceDirection: 'horizontal',
  spaceWrap: true,
})

// 分离 Col 和 Space 的 props
const colProps = computed(() => {
  const { space, spaceAlign, spaceJustify, spaceDirection, spaceWrap, ...colProps } = props
  return colProps
})

const spaceProps = computed(() => {
  return {
    size: props.space,
    align: props.spaceAlign,
    justify: props.spaceJustify,
    direction: props.spaceDirection,
    wrap: props.spaceWrap,
  }
})
</script>

<template>
  <JvCol v-bind="colProps">
    <JvSpace v-bind="spaceProps">
      <slot />
    </JvSpace>
  </JvCol>
</template>
