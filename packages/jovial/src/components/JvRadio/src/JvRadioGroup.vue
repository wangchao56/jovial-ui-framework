<script setup lang="ts">
import type { JvRadioGroupEmits, JvRadioGroupProps } from './JvRadioGroup'
import { createNamespace } from '@jovial/utils'
import { computed, provide } from 'vue'
import { radioGroupContextKey } from './JvRadioGroup'

defineOptions({
  name: 'JvRadioGroup',
})
const props = defineProps<JvRadioGroupProps>()
const emit = defineEmits<JvRadioGroupEmits>()
const bem = createNamespace('radio-group')
const model = useModel(props, 'modelValue')
// 给子组件提供一个name
const radioName = computed(() => props.name || `radio-group--${useId()}`)

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
  <fieldset :class="[bem.b(), { 'is-column': props.column, 'is-inline': props.inline }]" role="radiogroup">
    <legend :class="bem.e('legend')">
      请选择首选的联系方式：
    </legend>
    <slot />
  </fieldset>
</template>
