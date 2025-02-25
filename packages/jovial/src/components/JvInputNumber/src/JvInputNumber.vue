<script setup lang="ts">
import type { JvInputNumberEmits } from './JvInputNumber'
import { createNamespace } from '@jovial/utils'
import { jvInputNumberProps } from './JvInputNumber'
import '../style/style.css'

defineOptions({ name: 'JvInputNumber' })
defineProps(jvInputNumberProps)
const emit = defineEmits<JvInputNumberEmits>()
const bem = createNamespace('input-number')

function handleInput(event: Event) {
  emit('input', event)
}

function handleBlur(event: FocusEvent) {
  emit('blur', event)
}

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

function handleClear() {
  emit('clear')
}

function handleChange(event: Event) {
  emit('change', Number((event.target as HTMLInputElement).value))
}

// function handleIncrement() {
//   emit('increment')
// }

// function handleDecrement() {
//   emit('decrement')
// }
</script>

<template>
  <div :class="bem.b()">
    <div :class="bem.e('wrapper')">
      <input
        role="input"
        type="number"
        :class="bem.e('input')"
        :value="modelValue"
        :min="min"
        :max="max"
        :step="step"
        :precision="precision"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @clear="handleClear"
        @change="handleChange"
      >
      <div :class="bem.e('increment')" />
      <div :class="bem.e('decrement')" />
    </div>
  </div>
</template>
