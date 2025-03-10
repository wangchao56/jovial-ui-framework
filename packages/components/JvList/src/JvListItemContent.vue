<script setup lang="ts">
import type { JvListItemContentSlots } from './types'
import JvText from '@components/Typography/src/JvText.vue'
import JvTitle from '@components/Typography/src/JvTitle.vue'

defineOptions({
  name: 'JvListItemContent',
})

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

defineSlots<JvListItemContentSlots>()
</script>

<template>
  <div class="jv-list-item--content">
    <slot name="title">
      <JvTitle :title="title" />
    </slot>
    <slot name="subtitle">
      <JvText :text="subtitle" />
    </slot>
    <slot name="description">
      <JvText :text="description" />
    </slot>
  </div>
</template>
