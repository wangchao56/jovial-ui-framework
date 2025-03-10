<script setup lang="ts">
import type { JvTableColumnType } from './JvTable'

defineOptions({
  name: 'JvTableColumn',
})
defineProps<{
  column: JvTableColumnType
}>()
</script>

<template>
  <div>
    <slot />
  </div>
</template>
