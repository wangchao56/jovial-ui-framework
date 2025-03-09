<script setup lang="ts">
import { createNamespace } from '@jienix/utils'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import { type JvDataTimePickerEmits, jvDataTimePickerProps } from './JvDataTimePicker'

defineOptions({ name: 'JvDataTimePicker', inheritAttrs: false })
const props = defineProps(jvDataTimePickerProps)
const emit = defineEmits<JvDataTimePickerEmits>()
const bem = createNamespace('dataTimePicker')

const inputRef = ref<HTMLInputElement>()
const isVisible = ref(false)
// eslint-disable-next-line unused-imports/no-unused-vars
const currentDate = ref(props.modelValue ? dayjs(props.modelValue) : dayjs())

const formattedValue = computed(() => {
  return props.modelValue ? dayjs(props.modelValue).format(props.format) : ''
})

function handleFocus(e: FocusEvent) {
  if (props.disabled)
    return
  isVisible.value = true
  emit('focus', e)
}

function handleBlur(e: FocusEvent) {
  emit('blur', e)
}

function handleClear() {
  emit('update:modelValue', '')
  emit('clear')
}

// eslint-disable-next-line unused-imports/no-unused-vars
function handleChange(date: dayjs.Dayjs) {
  const value = date.format(props.format)
  emit('update:modelValue', value)
  emit('change', value)
  isVisible.value = false
}

// 暴露方法
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
})
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.is('disabled', disabled),
      bem.m(size),
    ]"
  >
    <input
      ref="inputRef" :class="bem.e('input')" :value="formattedValue" :placeholder="placeholder"
      :disabled="disabled" readonly @focus="handleFocus" @blur="handleBlur"
    >

    <div v-if="clearable && formattedValue" :class="bem.e('clear')" @click="handleClear">
      <slot name="clear-icon">
        <i class="jv-icon-close" />
      </slot>
    </div>

    <div :class="bem.e('icon')">
      <slot name="suffix">
        <i class="jv-icon-calendar" />
      </slot>
    </div>

    <div v-show="isVisible" :class="bem.e('dropdown')">
      <!-- 日期时间选择面板将在这里实现 -->
    </div>
  </div>
</template>
