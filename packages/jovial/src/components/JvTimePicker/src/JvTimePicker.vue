<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { jvTimePickerEmits, jvTimePickerProps } from './JvTimePicker'

defineOptions({ name: 'JvTimePicker' })
defineProps(jvTimePickerProps)
defineEmits(jvTimePickerEmits)
const bem = createNamespace('timePicker')
</script>

<template>
  <div :class="bem.b()" />
</template>
    import "../style/style.css"
