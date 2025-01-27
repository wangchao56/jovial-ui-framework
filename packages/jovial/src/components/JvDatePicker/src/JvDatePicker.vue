<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { jvDatePickerEmits, jvDatePickerProps } from './JvDatePicker'

defineOptions({ name: 'JvDatePicker' })
defineProps(jvDatePickerProps)
defineEmits(jvDatePickerEmits)
const bem = createNamespace('datePicker')
</script>

<template>
  <div :class="bem.b()" />
</template>
    import "../style/style.css"
