<template>
  <form :class="bem.b()">
    <slot></slot>
  </form>
</template>
<script setup lang="ts">
import { provide, reactive, ref } from 'vue'
import { createNamespace, isEmpty } from '@jovial/utils'
import { formEmits, formProps, formProviderKey } from './form'
import type { FormContext, FormExpose } from './form'
import { FormItemContext } from './form-item'
import { Values } from 'async-validator'
defineOptions({ name: 'JvForm' })
const props = defineProps(formProps)
const emit = defineEmits(formEmits)
const bem = createNamespace('form')

const fields: FormItemContext[] = [] // 收集表单项上下文
const addField: FormContext['addField'] = (context) => {
  // 收集表单项上下文，便于后续校验等操作
  if (isEmpty(context.prop)) return
  fields.push(context)
  setTimeout(() => {
    console.log('context', context)
  }, 1000)
}
const validate = async (
  callback?: (valid: boolean, fields: Values) => void
) => {
  let errors: Values = {}

  console.log('fields', fields)
  for (const field of fields) {
    try {
      await field.validate('')
    } catch (err) {
      console.log('err', err)
      errors = {
        ...errors,
        ...(err as Values)
      }
    }
  }

  if (Object.keys(errors).length) {
    if (callback) {
      callback?.(false, errors)
    } else {
      return Promise.reject(errors)
    }
  } else {
    if (callback) {
      callback?.(true, {})
    } else {
      return Promise.resolve(true)
    }
  }
}
const context: FormContext = {
  ...props,
  addField
}
provide(formProviderKey, context)

defineExpose<FormExpose>({
  validate
})
</script>
