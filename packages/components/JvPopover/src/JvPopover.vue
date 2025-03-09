<script setup lang="ts">
import type { JvPopoverEmits } from './JvPopover'
import { createNamespace } from '@jienix/utils'
import { jvPopoverProps } from './JvPopover'

defineOptions({ name: 'JvPopover', inheritAttrs: false })
defineProps(jvPopoverProps)
defineEmits<JvPopoverEmits>()
const bem = createNamespace('popover')
</script>

<template>
  <div :class="bem.b()" />
</template>
