<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { jvTableEmits, jvTableProps } from './JvTable'

defineOptions({ name: 'JvTable' })
defineProps(jvTableProps)
defineEmits(jvTableEmits)
const bem = createNamespace('table')
</script>

<template>
  <div :class="bem.b()" />
</template>
    import "../style/style.css"
