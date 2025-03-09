<script setup lang="ts">
import { provide, reactive, watch } from 'vue'
import { JvFormContextKey } from './context'
import { type JvFormContext, type JvFormEmits, type JvFormExpose, type JvFormField, jvFormProps } from './types'

const props = defineProps(jvFormProps)
const emit = defineEmits<JvFormEmits>()

// 表单项集合
const fields = reactive<JvFormField[]>([])

// 提供给子组件的表单上下文
const formContext = reactive<JvFormContext>({
  ...props,
  fields,
  addField: (field) => {
    fields.push(field)
  },
  removeField: (field) => {
    const index = fields.indexOf(field)
    if (index !== -1) {
      fields.splice(index, 1)
    }
  },
})

// 提供表单上下文给子组件
provide(JvFormContextKey, formContext)

// 监听规则变化
watch(() => props.rules, () => {
  if (props.validateOnRuleChange) {
    validate()
  }
}, { deep: true })

// 验证单个字段
async function validateField(prop: string) {
  const field = fields.find(field => field.prop === prop)
  if (field) {
    return field.validate()
  }
  return Promise.resolve(true)
}

// 验证多个字段
async function validateFields(props: string[]) {
  const fieldsToValidate = fields.filter(field => props.includes(field.prop))
  const results = await Promise.all(fieldsToValidate.map(field => field.validate()))
  return !results.includes(false)
}

// 验证所有字段
async function validate() {
  const results = await Promise.all(fields.map(field => field.validate()))
  return !results.includes(false)
}

// 重置表单
function resetFields() {
  fields.forEach(field => field.resetField())
}

// 清除验证
function clearValidate(props?: string | string[]) {
  if (props) {
    const fieldsToReset = Array.isArray(props) ? props : [props]
    fields.forEach((field) => {
      if (fieldsToReset.includes(field.prop)) {
        field.clearValidate()
      }
    })
  }
  else {
    fields.forEach(field => field.clearValidate())
  }
}

// 处理表单提交
async function handleSubmit() {
  const valid = await validate()
  emit('submit', { valid, model: props.model })
}
defineExpose<JvFormExpose>({
  validate,
  validateField,
  validateFields,
  resetFields,
  clearValidate,
})
</script>

<template>
  <form
    class="jv-form" :class="[
      `jv-form--${labelPosition}`,
      { 'jv-form--inline': inline },
    ]" role="form" @submit.prevent="handleSubmit"
  >
    <slot />
  </form>
</template>

<style>
.jv-form {
  font-family: var(--jv-font-family);
  color: var(--jv-on-surface);
}

.jv-form--inline {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: -16px;
}

.jv-form--inline .jv-form-item {
  margin-right: 16px;
  margin-bottom: 16px;
  flex: 0 0 auto;
}

.jv-form--left .jv-form-item__label {
  text-align: left;
}

.jv-form--right .jv-form-item__label {
  text-align: right;
}

.jv-form--top .jv-form-item__label {
  display: block;
  text-align: left;
  margin-bottom: 8px;
  padding: 0;
}

.jv-form--top .jv-form-item__content {
  margin-left: 0 !important;
}
</style>
