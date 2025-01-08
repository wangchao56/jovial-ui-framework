<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { editorEmits, editorProps } from './editor'

defineOptions({ name: 'JvEditor' })
defineProps(editorProps)
defineEmits(editorEmits)
const bem = createNamespace('editor')
</script>

<template>
  <div :class="bem.b()" />
</template>
