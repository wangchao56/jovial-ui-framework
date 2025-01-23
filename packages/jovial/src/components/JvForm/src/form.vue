<script setup lang="ts">
import type { ValidateFieldsError, Values } from 'async-validator'
import type { FormContext, FormExpose } from './form'
import type { FormItemContext } from './form-item'
import { createNamespace, isEmpty } from '@jovial/utils'
import { provide } from 'vue'
import { formEmits, formProps, formProviderKey } from './form'

defineOptions({ name: 'JvForm' })
const props = defineProps(formProps)
defineEmits(formEmits)
const bem = createNamespace('form')

const fieldsContext: Set<FormItemContext> = new Set() // 使用 收集表单项上下文

/**
 * addField 函数是 FormContext 类型中 addField 方法的具体实现。
 * 它接收一个参数 context，该参数是一个包含表单项上下文的对象。
 * 此函数负责将表单项上下文添加到 fields 集合中，以便后续进行表单校验等操作。
 */
const addField: FormContext['addField'] = (context: FormItemContext) => {
  /**
   * 首先检查传入的 context 对象的 prop 属性是否为空。
   * 如果 prop 属性为空，说明这不是一个有效的表单项上下文，因此直接返回，不执行后续操作。
   * 这里假设 isEmpty 是一个已定义的函数，用于检查给定值是否为空。
   */
  if (isEmpty(context.prop))
    return
  /**
   * 如果 context 的 prop 属性不为空，则将其添加到 fields 集合中。
   * 注意：这里使用了 WeakSet 来存储表单项上下文。
   * WeakSet 是一个弱引用集合，它不会阻止其成员对象被垃圾回收。
   * 这意味着如果某个表单项上下文对象在外部没有其他引用，它将被垃圾回收器自动清理，从而避免内存泄漏。
   * 使用 WeakSet 的前提是 fields 已经被声明为一个 WeakSet 实例。
   */
  fieldsContext.add(context) // 使用 WeakSet 添加上下文
}

/**
 * handleValidationResults 函数用于处理验证结果。
 * 它接收一个 PromiseSettledResult 数组和一个可选的回调函数作为参数。
 */
function handleValidationResults(results: PromiseSettledResult<Awaited<any>>[], callback?: (valid: boolean, fields: ValidateFieldsError | Values) => void) {
  let errors: Values = {}
  results.forEach((result) => {
    if (result.status === 'rejected') {
      errors = { ...errors, ...(result.reason as Values) } // 合并验证错误
    }
    else {
      // 如果有任何验证通过，可以在此处执行额外操作或记录日志
      // 例如，可以记录验证通过的字段或执行其他逻辑
      console.log('Validation passed for:', result.value)
    }
  })

  if (Object.keys(errors).length > 0) {
    if (callback) {
      callback(false, errors)
    }
    else {
      Promise.reject(errors)
    }
  }
  else {
    if (callback) {
      callback(true, {})
    }
    else {
      Promise.resolve(true)
    }
  }
}

/**
 * validate 函数用于异步验证表单。
 * 它接收一个可选的回调函数作为参数，并在验证完成后调用该函数。
 */
async function validate(callback?: (valid: boolean, fields: ValidateFieldsError | Values) => void) {
  const results = await Promise.allSettled(
    Array.from(fieldsContext).map(context => context.validate('')),
  )
  handleValidationResults(results, callback)
}

// 创建 FormContext 对象，并包含 props 和 addField 方法
const context: FormContext = {
  ...props,
  addField,
}
// 使用 provide 函数提供 FormContext 给后代组件
provide(formProviderKey, context)

function resetFields() {
  fieldsContext.forEach(context => context.resetField())
}

// 暴露 validate 方法给模板或父组件使用
defineExpose<FormExpose>({
  validate,
  resetFields,
})
</script>

<template>
  <form :class="bem.b()">
    <slot />
  </form>
</template>
