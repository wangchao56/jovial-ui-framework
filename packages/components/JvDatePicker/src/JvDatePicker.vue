<script setup lang="ts">
import type { JvDatePickerEmits } from './JvDatePicker'
import { createNamespace } from '@jienix/utils'
import { ref } from 'vue'
import { jvDatePickerProps } from './JvDatePicker'

defineOptions({ name: 'JvDatePicker', inheritAttrs: false })
defineProps(jvDatePickerProps)
const emit = defineEmits<JvDatePickerEmits>()

const bem = createNamespace('datePicker')
const inputRef = ref<HTMLInputElement>()

// 暴露方法
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
})

// 处理值变更
function handleChange(evt: Event) {
  const value = (evt.target as HTMLInputElement).value
  emit('update:modelValue', value)
  emit('change', value)
}

// 处理清除
function handleClear() {
  handleChange({ target: { value: '' } } as unknown as Event)
  emit('clear')
}
</script>

<template>
  <div :class="bem.b()">
    <input
      ref="inputRef" :class="bem.e('input')" :value="modelValue" :placeholder="placeholder" :disabled="disabled"
      @input="handleChange"
    >
    <span v-if="clearable && modelValue" :class="bem.e('clear')" @click="handleClear">
      ×
    </span>
  </div>
</template>
