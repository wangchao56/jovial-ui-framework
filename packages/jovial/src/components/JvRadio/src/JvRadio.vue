<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { jvRadioEmits, jvRadioProps } from './JvRadio'

defineOptions({ name: 'JvRadio' })
defineProps(jvRadioProps)
defineEmits(jvRadioEmits)
const bem = createNamespace('radio')
</script>

<template>
  <div :class="bem.b()" />
</template>
