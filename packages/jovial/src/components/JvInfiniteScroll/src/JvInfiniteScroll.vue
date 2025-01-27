<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { jvInfiniteScrollEmits, jvInfiniteScrollProps } from './JvInfiniteScroll'

defineOptions({ name: 'JvInfiniteScroll' })
defineProps(jvInfiniteScrollProps)
defineEmits(jvInfiniteScrollEmits)
const bem = createNamespace('infiniteScroll')
</script>

<template>
  <div :class="bem.b()" />
</template>
    import "../style/style.css"
