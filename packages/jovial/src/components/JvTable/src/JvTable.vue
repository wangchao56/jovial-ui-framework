<script setup lang="ts">
import type { JvTableEmits } from './JvTable'
import { createNamespace } from '@jovial/utils'
import { jvTableProps } from './JvTable'

defineOptions({ name: 'JvTable' })
defineProps(jvTableProps)
defineEmits<JvTableEmits>()
const bem = createNamespace('table')
</script>

<template>
  <div :class="bem.b()" />
</template>
