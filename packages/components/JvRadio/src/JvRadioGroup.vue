<script setup lang="ts">
import type { JvRadioGroupEmits } from './JvRadioGroup'
import { createNamespace, getUid } from '@jienix/utils'
import { computed, provide } from 'vue'
import { jvRadioGroupProps, radioGroupContextKey } from './JvRadioGroup'

defineOptions({
  name: 'JvRadioGroup',
  inheritAttrs: false,
})
const props = defineProps(jvRadioGroupProps)
const emit = defineEmits<JvRadioGroupEmits>()
const bem = createNamespace('radio-group')
const model = defineModel<string | number | boolean>('modelValue')
// 给子组件提供一个name
const radioName = computed(() => props.name || `radio-group--${getUid()}`)

function dispatch(event: 'change' | 'update:modelValue', args: string | number | boolean | undefined, valueType: string) {
  if (valueType === '[object Number]') {
    args = Number(args)
  }
  else if (valueType === '[object Boolean]') {
    args = Boolean(args)
  }
  else if (valueType === '[object String]') {
    args = String(args)
  }

  switch (event) {
    case 'change':
      model.value = args
      emit('change', args)
      break
    case 'update:modelValue':
      model.value = args
      emit('update:modelValue', args)
      break
  }
}

// 提供给子组件的上下文
provide(radioGroupContextKey, {
  name: radioName.value,
  modelValue: model,
  disabled: computed(() => props.disabled).value,
  dispatch,
})
</script>

<template>
  <fieldset
    :class="[
      bem.b(),
      {
        'is-column': props.column,
        'is-inline': props.inline,
        'is-bordered': props.bordered,
        'is-compact': props.compact,
      },
    ]" role="radiogroup"
  >
    <legend v-if="props.legend || $slots.legend" :class="bem.e('legend')">
      <slot name="legend">
        {{ props.legend }}
      </slot>
    </legend>
    <slot />
  </fieldset>
</template>
