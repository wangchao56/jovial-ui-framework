<template>
  <div :class="bem.b()"></div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { createNamespace } from '@jovial/utils'
import { popoverEmits, popoverProps } from './popover'
defineOptions({ name: 'JvPopover' })
const props = defineProps(popoverProps)
const emit = defineEmits(popoverEmits)
const bem = createNamespace('popover')
</script>
