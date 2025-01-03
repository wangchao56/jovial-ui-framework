<template>
  <div :class="bem.b()"></div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { createNamespace } from '@jovial/utils'
import { dialogEmits, dialogProps } from './dialog'
defineOptions({ name: 'JvDialog' })
const props = defineProps(dialogProps)
const emit = defineEmits(dialogEmits)
const bem = createNamespace('dialog')
</script>
