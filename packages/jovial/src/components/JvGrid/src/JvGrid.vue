<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { jvGridEmits, jvGridProps } from './JvGrid'

defineOptions({ name: 'JvGrid' })
defineProps(jvGridProps)
defineEmits(jvGridEmits)
const bem = createNamespace('grid')

// const gridRef = ref<HTMLDivElement>()
</script>

<template>
  <div :class="bem.b()" />
</template>

<style lang="post" scoped>

</style>
