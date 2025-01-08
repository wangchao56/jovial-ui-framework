<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import {
  virtualScrollListEmits,
  virtualScrollListProps,
} from './virtual-scroll-list'

defineOptions({ name: 'JvVirtualScrollList' })
defineProps(virtualScrollListProps)
defineEmits(virtualScrollListEmits)
const bem = createNamespace('virtual-scroll-list')
</script>

<template>
  <div :class="bem.b()" />
</template>
