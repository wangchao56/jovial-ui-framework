<script>
import AsyncValidator from 'async-validator'
import { computed, getCurrentInstance, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { JvFormContextKey } from './context'

export default {
  name: 'JvFormItem',
  props: {
    prop: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    labelWidth: {
      type: [String, Number],
      default: '',
    },
    required: {
      type: Boolean,
      default: undefined,
    },
    rules: {
      type: [Object, Array],
      default: () => ({}),
    },
    error: {
      type: String,
      default: '',
    },
    validateStatus: {
      type: String,
      default: '',
      validator: value => ['', 'error', 'success', 'validating'].includes(value),
    },
    for: {
      type: String,
      default: '',
    },
    inlineMessage: {
      type: Boolean,
      default: false,
    },
    showMessage: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: '',
    },
  },
  emits: ['validate'],
  setup(props, { emit, expose }) {
    // 获取表单上下文
    const formContext = inject(JvFormContextKey, {})

    // 验证状态和消息
    const validateState = ref('')
    const validateMessage = ref('')
    const isValidating = ref(false)

    // 获取当前实例
    const instance = getCurrentInstance()

    // 计算标签样式
    const labelStyle = computed(() => {
      if (props.labelWidth || formContext.labelWidth) {
        return {
          width: props.labelWidth || formContext.labelWidth,
        }
      }
      return {}
    })

    // 计算内容样式
    const contentStyle = computed(() => {
      if (props.labelWidth || formContext.labelWidth) {
        return {
          marginLeft: props.labelWidth || formContext.labelWidth,
        }
      }
      return {}
    })

    // 计算是否显示错误信息
    const showError = computed(() => {
      if (props.inlineMessage)
        return true
      if (props.showMessage === false)
        return false
      return formContext.showMessage !== false
    })

    // 计算标签的 for 属性
    const labelFor = computed(() => props.for || '')

    // 获取字段值
    const fieldValue = computed(() => {
      if (!props.prop || !formContext.model)
        return

      const model = formContext.model
      const path = props.prop.split('.')
      let value = model

      for (const key of path) {
        if (!value)
          return
        value = value[key]
      }

      return value
    })

    // 获取验证规则
    const getRules = () => {
      const formRules = formContext.rules || {}
      const itemRules = props.rules

      // 获取表单中的规则
      const propRules = formRules[props.prop]

      // 合并规则
      const rules = [].concat(itemRules || propRules || [])

      // 如果设置了 required 属性，添加必填规则
      if (props.required !== undefined) {
        rules.push({ required: props.required, message: `${props.label || props.prop} is required` })
      }

      return rules
    }

    // 计算是否必填
    const isRequired = computed(() => {
      if (props.required !== undefined) {
        return props.required
      }

      const rules = getRules()
      return rules.some(rule => rule.required)
    })

    // 验证字段
    const validate = async (trigger) => {
      // 如果没有设置 prop 或没有规则，则跳过验证
      if (!props.prop || !formContext.model) {
        return true
      }

      // 获取规则
      const rules = getRules()

      // 如果没有规则，则跳过验证
      if (!rules || rules.length === 0) {
        return true
      }

      // 如果指定了触发器，则只验证对应的规则
      const filteredRules = trigger
        ? rules.filter(rule => !rule.trigger || rule.trigger === trigger || (Array.isArray(rule.trigger) && rule.trigger.includes(trigger)))
        : rules

      // 如果没有匹配的规则，则跳过验证
      if (filteredRules.length === 0) {
        return true
      }

      // 设置验证状态
      validateState.value = 'validating'
      isValidating.value = true

      // 创建验证器
      const validator = new AsyncValidator({
        [props.prop]: filteredRules,
      })

      // 设置验证选项
      const options = {
        firstFields: true,
      }

      // 构建验证数据
      const model = {}
      const path = props.prop.split('.')
      let value = formContext.model

      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i]
        if (!value[key]) {
          value[key] = {}
        }
        value = value[key]
      }

      model[props.prop] = fieldValue.value

      try {
        // 执行验证
        await validator.validate(model, options)

        // 验证通过
        validateState.value = 'success'
        validateMessage.value = ''
        emit('validate', true, '')
        return true
      }
      catch (errors) {
        // 验证失败
        validateState.value = 'error'
        validateMessage.value = errors.errors[0].message || 'Validation failed'
        emit('validate', false, validateMessage.value)
        return false
      }
      finally {
        isValidating.value = false
      }
    }

    // 重置字段
    const resetField = () => {
      if (!props.prop || !formContext.model)
        return

      // 重置验证状态
      validateState.value = ''
      validateMessage.value = ''
    }

    // 清除验证
    const clearValidate = () => {
      validateState.value = ''
      validateMessage.value = ''
    }

    // 监听字段值变化
    watch(fieldValue, () => {
      if (formContext.validateOnRuleChange) {
        validate()
      }
    })

    // 组件挂载时注册字段
    onMounted(() => {
      formContext.addField(instance)
    })

    // 组件卸载时移除字段
    onBeforeUnmount(() => {
      formContext.removeField(instance)
    })

    // 暴露方法
    expose({
      validate,
      resetField,
      clearValidate,
    })

    return {
      validateState,
      validateMessage,
      isValidating,
      labelStyle,
      contentStyle,
      showError,
      labelFor,
      isRequired,
      validate,
    }
  },
}
</script>

<template>
  <div
    class="jv-form-item"
    :class="[
      {
        'jv-form-item--error': validateState === 'error',
        'jv-form-item--success': validateState === 'success',
        'jv-form-item--required': isRequired,
        'jv-form-item--no-asterisk': formContext?.hideRequiredAsterisk,
        [`jv-form-item--${formContext?.size}`]: formContext?.size !== 'default',
      },
    ]"
  >
    <!-- 标签 -->
    <label
      v-if="label || $slots.label"
      class="jv-form-item__label"
      :style="labelStyle"
      :for="labelFor"
    >
      <slot name="label">{{ label }}</slot>
      <span v-if="!formContext?.hideRequiredAsterisk && isRequired" class="jv-form-item__required">*</span>
      <span v-if="formContext?.labelSuffix" class="jv-form-item__suffix">{{ formContext?.labelSuffix }}</span>
    </label>

    <!-- 内容 -->
    <div
      class="jv-form-item__content"
      :style="contentStyle"
    >
      <slot />

      <!-- 错误信息 -->
      <transition name="jv-form-item-fade">
        <div
          v-if="validateState === 'error' && showError"
          class="jv-form-item__error"
        >
          {{ validateMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>

<style>
.jv-form-item {
  margin-bottom: 16px;
}

.jv-form-item--error .jv-form-item__error {
  color: red;
}

.jv-form-item--success .jv-form-item__error {
  color: green;
}

.jv-form-item__label {
  display: inline-block;
  margin-bottom: 8px;
}

.jv-form-item__content {
  display: flex;
  flex-direction: column;
}

.jv-form-item__required {
  color: red;
  margin-left: 4px;
}

.jv-form-item__error {
  font-size: 12px;
  margin-top: 4px;
}
</style>
