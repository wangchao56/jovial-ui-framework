<script setup lang="ts">
import { JvText } from '@components/Typography'
import { computed, inject } from 'vue'
import { JvListContextKey } from './JvList'

defineOptions({
  name: 'JvListSubheader',
  inheritAttrs: false,
})

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
      <JvText :text="title" type="secondary" align="start" />
    </slot>
  </li>
</template>
