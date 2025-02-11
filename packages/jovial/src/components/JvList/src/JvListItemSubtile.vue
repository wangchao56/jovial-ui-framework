<script setup lang="ts">
import type { JvListItemSubtitleProps } from './types'
import { createNamespace } from '@jovial/utils'
import { computed } from 'vue'

defineOptions({
  name: 'JvListItemSubtitle',
})

withDefaults(defineProps<JvListItemSubtitleProps>(), {
  tag: 'div',
})

const bem = createNamespace('list-item-subtitle')
const classes = computed(() => [
  bem.b(),
])
</script>

<template>
  <component :is="tag" :class="classes">
    <slot> {{ subtitle }} </slot>
  </component>
</template>

<style scoped>
.jv-list-item-subtitle {
  color: var(--jv-list-item-subtitle-color, inherit);
  font-size: var(--jv-list-item-subtitle-font-size, 0.875rem);
  font-weight: var(--jv-list-item-subtitle-font-weight, 400);
  line-height: var(--jv-list-item-subtitle-line-height, 1.5);
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
