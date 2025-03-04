<script setup lang="ts">
import { createNamespace } from '@jienix/utils'
import { ref } from 'vue'
import { type JvColorPickerEmits, jvColorPickerProps } from './JvColorPicker'
import '../style/style.css'

defineOptions({ name: 'JvColorPicker' })
defineProps(jvColorPickerProps)
const emit = defineEmits<JvColorPickerEmits>()
const bem = createNamespace('colorPicker')

const colorInput = ref<HTMLInputElement | null>(null)
const isOpen = ref(false)

function handleColorChange(event: Event) {
  const target = event.target as HTMLInputElement
  const newColor = target.value
  emit('update:modelValue', newColor)
  emit('change', newColor)
}

function focus() {
  colorInput.value?.focus()
}

function blur() {
  colorInput.value?.blur()
}

defineExpose({
  focus,
  blur,
})
</script>

<template>
  <div :class="[bem.b(), { [bem.m('disabled')]: disabled }]">
    <div :class="bem.e('trigger')" @click="isOpen = !disabled && !isOpen">
      <div
        :class="bem.e('color-preview')"
        :style="{ backgroundColor: modelValue }"
      />
    </div>
    <div v-if="isOpen" :class="bem.e('dropdown')">
      <input
        ref="colorInput"
        type="color"
        :value="modelValue"
        :class="bem.e('input')"
        @input="handleColorChange"
      >
    </div>
  </div>
</template>
