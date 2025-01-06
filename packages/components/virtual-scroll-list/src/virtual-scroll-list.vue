<template>
  <div :class="bem.b()"></div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { createNamespace } from '@jovial/utils'
import {
  virtualScrollListEmits,
  virtualScrollListProps
} from './virtual-scroll-list'
defineOptions({ name: 'JvVirtualScrollList' })
const props = defineProps(virtualScrollListProps)
const emit = defineEmits(virtualScrollListEmits)
const bem = createNamespace('virtual-scroll-list')
</script>
