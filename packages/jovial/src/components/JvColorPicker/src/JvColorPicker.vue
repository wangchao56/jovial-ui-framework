<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { jvColorPickerEmits, jvColorPickerProps } from './JvColorPicker'
import '../style/style.css'

defineOptions({ name: 'JvColorPicker' })
defineProps(jvColorPickerProps)
defineEmits(jvColorPickerEmits)
const bem = createNamespace('colorPicker')
</script>

<template>
  <div :class="bem.b()" />
</template>
