<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { dialogEmits, dialogProps } from './dialog'

defineOptions({ name: 'JvDialog' })
defineProps(dialogProps)
defineEmits(dialogEmits)
const bem = createNamespace('dialog')
</script>

<template>
  <div :class="bem.b()" />
</template>
