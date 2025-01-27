<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { jvDraggableSortableEmits, jvDraggableSortableProps } from './JvDraggableSortable'

defineOptions({ name: 'JvDraggableSortable' })
defineProps(jvDraggableSortableProps)
defineEmits(jvDraggableSortableEmits)
const bem = createNamespace('draggableSortable')
</script>

<template>
  <div :class="bem.b()" />
</template>
    import "../style/style.css"
