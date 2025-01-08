<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { popoverEmits, popoverProps } from './popover'

defineOptions({ name: 'JvPopover' })
defineProps(popoverProps)
defineEmits(popoverEmits)
const bem = createNamespace('popover')
</script>

<template>
  <div :class="bem.b()" />
</template>
