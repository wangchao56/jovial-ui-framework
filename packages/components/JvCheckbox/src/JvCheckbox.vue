<script setup lang="ts">
import type { JvCheckboxEmits } from './JvCheckbox'
import { createNamespace } from '@jienix/utils'
import { jvCheckboxProps } from './JvCheckbox'

defineProps(jvCheckboxProps)
const emit = defineEmits<JvCheckboxEmits>()
const bem = createNamespace('checkbox')

const model = defineModel<boolean>('modelValue', { required: true })

function onChange(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).checked)
  emit('change', (event.target as HTMLInputElement).checked)
}
</script>

<template>
  <label
    :class="[
      bem.b(),
      {
        'jv-checkbox--checked': modelValue,
        'jv-checkbox--disabled': disabled,
        'jv-checkbox--indeterminate': indeterminate,
      },
    ]"
  >
    <input
      type="checkbox" :class="bem.e('input')" :checked="model" :disabled="disabled" :indeterminate="indeterminate"
      @change="onChange"
    >

    <span :class="bem.e('checkmark')">
      <span :class="bem.e('icon')" />
    </span>

    <span v-if="$slots.default || label" :class="bem.e('label')">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
