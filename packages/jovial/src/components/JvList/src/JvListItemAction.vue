<script setup lang="ts">
import type { JvListItemActionProps } from './types'
import { createNamespace } from '@jovial/utils'
import { computed } from 'vue'

defineOptions({
  name: 'JvListItemAction',
})

withDefaults(defineProps<JvListItemActionProps>(), {
  tag: 'div',
})

const bem = createNamespace('list-item-action')
const classes = computed(() => [
  bem.b(),
])
</script>

<template>
  <component :is="tag" :class="classes">
    <slot>
      <div v-for="action in actions" :key="action" class="jv-list-item-action">
        {{ action }}
      </div>
    </slot>
  </component>
</template>

<style lang="post" scoped>
.jv-list-item-action {
  display: flex;
  padding: 0.5rem;
  color: var(--jv-list-item-action-color, inherit);
  font-size: var(--jv-list-item-action-font-size, 0.875rem);
  font-weight: var(--jv-list-item-action-font-weight, 400);
  cursor: pointer;
  align-items: center;
  justify-content: center;
}
</style>
