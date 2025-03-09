<script setup lang="ts">
import type { JvInputNumberEmits } from './JvInputNumber'
import { computed, nextTick, ref, watch } from 'vue'

import { jvInputNumberProps } from './JvInputNumber'

defineOptions({ name: 'JvInputNumber', inheritAttrs: false })

const props = defineProps(jvInputNumberProps)
const emit = defineEmits<JvInputNumberEmits>()

const inputRef = ref<HTMLInputElement | null>(null)

// 当前值
const currentValue = ref<number | string>(props.modelValue)

// 获取精度
function getPrecision(value: number) {
  if (value === undefined)
    return 0
  const valueString = value.toString()
  const dotPosition = valueString.indexOf('.')
  return dotPosition !== -1 ? valueString.length - dotPosition - 1 : 0
}

// 计算精度
const numPrecision = computed(() => {
  const stepPrecision = getPrecision(props.step)
  if (props.precision !== undefined) {
    return props.precision
  }
  else {
    return Math.max(getPrecision(Number(currentValue.value)), stepPrecision)
  }
})

// 格式化数字
function formatNumber(value: string | number) {
  if (value === '' || value === null)
    return ''

  const parsedValue = Number.parseFloat(value.toString())
  if (Number.isNaN(parsedValue))
    return ''

  // 应用精度
  return parsedValue.toFixed(numPrecision.value)
}

// 显示值
const displayValue = computed(() => {
  if (currentValue.value === '' || currentValue.value === null)
    return ''
  return formatNumber(currentValue.value)
})

// 是否可以减少
const decreaseDisabled = computed(() => {
  return !!(props.min !== undefined && Number(currentValue.value) <= props.min)
})

// 是否可以增加
const increaseDisabled = computed(() => {
  return !!(props.max !== undefined && Number(currentValue.value) >= props.max)
})

// 增加值
function increase() {
  if (props.readonly || increaseDisabled.value)
    return

  let newVal = Number(currentValue.value) + props.step

  // 如果启用了严格步进，则确保值是步进的倍数
  if (props.stepStrictly) {
    newVal = Math.round(newVal / props.step) * props.step
  }

  // 限制最大值
  if (props.max !== undefined) {
    newVal = Math.min(newVal, props.max)
  }

  setCurrentValue(newVal)
}

// 减少值
function decrease() {
  if (props.readonly || decreaseDisabled.value)
    return

  let newVal = Number(currentValue.value) - props.step

  // 如果启用了严格步进，则确保值是步进的倍数
  if (props.stepStrictly) {
    newVal = Math.round(newVal / props.step) * props.step
  }

  // 限制最小值
  if (props.min !== undefined) {
    newVal = Math.max(newVal, props.min)
  }

  setCurrentValue(newVal)
}

// 设置当前值
function setCurrentValue(value: string | number) {
  // 如果值没有变化，则不做任何操作
  if (value === currentValue.value)
    return

  // 解析值
  let newVal = value

  // 如果值为空，则设置为最小值或0
  if (newVal === '' || newVal === null) {
    newVal = props.min !== undefined ? props.min : 0
  }
  else {
    newVal = Number(newVal)

    // 如果不是数字，则设置为最小值或0
    if (Number.isNaN(newVal)) {
      newVal = props.min !== undefined ? props.min : 0
    }

    // 应用最小值和最大值限制
    if (props.min !== undefined) {
      newVal = Math.max(props.min, newVal)
    }
    if (props.max !== undefined) {
      newVal = Math.min(props.max, newVal)
    }

    // 如果启用了严格步进，则确保值是步进的倍数
    if (props.stepStrictly) {
      newVal = Math.round(newVal / props.step) * props.step
    }

    // 应用精度
    if (numPrecision.value >= 0) {
      newVal = Number.parseFloat(newVal.toFixed(numPrecision.value))
    }
  }

  // 更新当前值
  currentValue.value = newVal
  emit('update:modelValue', newVal as number)
}

// 处理输入
function handleInput(event: Event) {
  const value = (event.target as HTMLInputElement).value

  // 允许输入特殊字符，如负号、小数点等
  const inputRegExp = /^-?\d*(?:\.\d*)?$/

  if (value === '' || inputRegExp.test(value)) {
    currentValue.value = value
  }
  else {
    // 如果输入无效，则恢复输入框的值
    if (inputRef.value) {
      inputRef.value.value = displayValue.value
    }
  }

  emit('input', event)
}

// 处理变更
function handleChange(event: Event) {
  const value = (event.target as HTMLInputElement).value

  if (value === '') {
    setCurrentValue('')
  }
  else {
    setCurrentValue(value)
  }

  emit('change', Number(currentValue.value))

  // 确保输入框显示格式化后的值
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.value = displayValue.value
    }
  })
}

// 处理失焦
function handleBlur(event: FocusEvent) {
  // 当输入框失去焦点时，确保值被正确格式化
  if (currentValue.value === '') {
    setCurrentValue(props.min !== undefined ? props.min : 0)
  }
  else {
    setCurrentValue(currentValue.value)
  }

  emit('blur', event)

  // 确保输入框显示格式化后的值
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.value = displayValue.value
    }
  })
}

// 处理聚焦
function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

// 监听 modelValue 变化
watch(() => props.modelValue, (newVal) => {
  // 如果外部值变化，则更新内部值
  if (newVal !== currentValue.value) {
    currentValue.value = newVal
  }
})
</script>

<template>
  <div
    class="jv-input-number" :class="[
      { 'jv-input-number--disabled': disabled },
      { 'jv-input-number--error': error },
      { 'jv-input-number--success': success },
      { 'jv-input-number--small': size === 'small' },
      { 'jv-input-number--large': size === 'large' },
    ]"
  >
    <!-- 标签 -->
    <label v-if="label" class="jv-input-number__label">{{ label }}</label>

    <div class="jv-input-number__wrapper">
      <!-- 减少按钮 -->
      <button
        v-ripple type="button" class="jv-input-number__decrease" :disabled="decreaseDisabled || disabled"
        @click="decrease"
      >
        <span class="jv-icon-remove" />
      </button>

      <!-- 输入框 -->
      <input
        :id="id" ref="inputRef" type="text" class="jv-input-number__input" :value="displayValue"
        :placeholder="placeholder" :disabled="disabled" :readonly="readonly" :name="name" :max="max" :min="min"
        :step="step" @input="handleInput" @change="handleChange" @blur="handleBlur" @focus="handleFocus"
        @keydown.up.prevent="increase" @keydown.down.prevent="decrease"
      >

      <!-- 增加按钮 -->
      <button
        v-ripple type="button" class="jv-input-number__increase" :disabled="increaseDisabled || disabled"
        @click="increase"
      >
        <span class="jv-icon-add" />
      </button>
    </div>

    <!-- 辅助文本 -->
    <div v-if="helperText" class="jv-input-number__helper-text">
      {{ helperText }}
    </div>
    <div v-if="errorText" class="jv-input-number__error-text">
      {{ errorText }}
    </div>
  </div>
</template>
