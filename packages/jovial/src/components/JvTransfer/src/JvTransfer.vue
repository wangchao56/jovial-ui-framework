<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { jvTransferEmits, jvTransferProps } from './JvTransfer'

defineOptions({ name: 'JvTransfer' })
defineProps(jvTransferProps)
defineEmits(jvTransferEmits)
const bem = createNamespace('transfer')
</script>

<template>
  <div :class="bem.b()" />
</template>
