<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { jvSliderEmits, jvSliderProps } from './JvSlider'

defineOptions({ name: 'JvSlider' })
defineProps(jvSliderProps)
defineEmits(jvSliderEmits)
const bem = createNamespace('slider')
</script>

<template>
  <div :class="bem.b()" />
</template>
