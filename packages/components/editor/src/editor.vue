<template>
  <div :class="bem.b()"></div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { createNamespace } from '@jovial/utils'
import { editorEmits, editorProps } from './editor'
defineOptions({ name: 'JvEditor' })
const props = defineProps(editorProps)
const emit = defineEmits(editorEmits)
const bem = createNamespace('editor')
</script>
