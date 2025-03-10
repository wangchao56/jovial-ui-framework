<script setup lang="ts">
import { inject } from 'vue'
import { JvListContextKey } from './JvList'

const props = defineProps({
  title: String,
  sticky: Boolean,
  inset: Boolean,
})
const listContext = inject(JvListContextKey)

const style = computed(() => {
  return props.inset
    ? {
        paddingLeft: `${listContext?.indent || 24}px`,
      }
    : undefined
})
</script>

<template>
  <li class="jv-list-subheader" :style="style">
    <slot>
      <JvText :text="title" />
    </slot>
  </li>
</template>
