<script setup lang="ts">
import type { JvListItemTitleProps } from './types'
import { createNamespace } from '@jovial/utils'
import { computed } from 'vue'

defineOptions({
  name: 'JvListItemTitle',
})

withDefaults(defineProps<JvListItemTitleProps>(), {
  tag: 'div',
})

const bem = createNamespace('list-item-title')
const classes = computed(() => [
  bem.b(),
])
</script>

<template>
  <component :is="tag" :class="classes">
    <slot> {{ title }} </slot>
  </component>
</template>

<style lang="post" scoped>
.jv-list-item-title {
  color: var(--jv-list-item-title-color, inherit);
  font-size: var(--jv-list-item-title-font-size, 1rem);
  font-weight: var(--jv-list-item-title-font-weight, 400);
  line-height: var(--jv-list-item-title-line-height, 1.5);
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
