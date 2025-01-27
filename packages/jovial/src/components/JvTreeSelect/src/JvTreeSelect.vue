<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { jvTreeSelectEmits, jvTreeSelectProps } from './JvTreeSelect'

defineOptions({ name: 'JvTreeSelect' })
defineProps(jvTreeSelectProps)
defineEmits(jvTreeSelectEmits)
const bem = createNamespace('treeSelect')
</script>

<template>
  <div :class="bem.b()" />
</template>
    import "../style/style.css"
