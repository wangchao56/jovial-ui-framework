<template>
  <div :class="bem.b()">
    <div v-if="$slots.prepend" :class="bem.be('group', 'prepend')">
      <slot name="prepend" />
    </div>

    <div :class="[bem.e('wrapper')]">
      <span v-if="$slots.prefix" :class="bem.e('prefix')">
        <slot name="prefix" />
      </span>

      <input
        v-bind="$attrs"
        ref="inputRef"
        :type="nativeType"
        :class="bem.e('inner')"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        @input="emitInput"
        @focus="emitFocus"
        @blur="emitBlur"
        @change="emitChange"
        @keydown="emitKeydown"
      />

      <span
        v-if="showPwdVisible"
        :class="bem.e('toggle')"
        @click="toggleShowPassword"
      >
        <JvIcon color="#c0c4cc">
          <IconEyeOff v-if="showPassword" />
          <IconEyeOn v-else />
        </JvIcon>
      </span>
      <span v-if="showClearable" :class="bem.e('clear')">
        <JvIcon color="#c0c4cc" @click="clear">
          <IconCloseThick />
        </JvIcon>
      </span>
      <span v-if="$slots.suffix" :class="bem.e('suffix')">
        <slot name="suffix" />
      </span>
    </div>

    <div v-if="$slots.append" :class="bem.be('group', 'prepend')">
      <slot name="append" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, useSlots, watch, nextTick, computed } from 'vue'
import { createNamespace } from '@jovial/utils'
import {
  inputEmits,
  InputEmits,
  InputExposes,
  InputPropsType,
  inputProps,
  InputSlots
} from './input'

import IconEyeOff from '@jovial/components/internal-icon/IconEyeOff'
import IconEyeOn from '@jovial/components/internal-icon/IconEyeOn'
import IconCloseThick from '@jovial/components/internal-icon/close-thick'

defineOptions({ name: 'JvInput' })
const props = withDefaults(defineProps<InputPropsType>(), {
  type: 'text',
  placeholder: undefined,
  disabled: false,
  readonly: false,
  modelValue: ''
})
const emit = defineEmits<InputEmits>()
defineSlots<InputSlots>()
const slots = useSlots()
const bem = createNamespace('input')
const model = reactive({
  value: props.modelValue || ''
})

const inputRef = ref<HTMLInputElement>()

//查看密码
const showPassword = ref(false)
function toggleShowPassword() {
  showPassword.value = !showPassword.value
}
const showPwdVisible = computed(() => {
  return (
    props.type === 'password' &&
    !props.readonly &&
    !props.disabled &&
    slots.suffix === undefined
  )
})

const showClearable = computed(() => {
  return (
    !props.disabled &&
    !props.readonly &&
    model.value !== '' &&
    (slots.suffix === undefined || props.clearable)
  )
})

const nativeType = computed(() => {
  if (props.type === 'password' && showPassword.value) {
    return 'text'
  }
  return props.type
})

function setNativeInputValue() {
  const inputEle = inputRef.value
  if (inputEle) {
    inputEle.value = props.modelValue || ''
  }
}
watch(
  () => props.modelValue,
  (newVal) => {
    setNativeInputValue()
  },
  { immediate: true }
)
// TODO: 事件
function emitInput(e: Event) {
  model.value = (e.target as HTMLInputElement).value
  emit('input', model.value)
  emit('update:modelValue', model.value)
}
function emitChange(e: Event) {
  emit('change', model.value as string)
}

function emitFocus(e: FocusEvent) {
  emit('focus')
}

function emitBlur(e: FocusEvent) {
  emit('blur')
}
function emitKeydown(e: KeyboardEvent) {
  emit('keydown', e)
}

async function focus() {
  if (props.disabled) return
  if (props.readonly) return
  if (!inputRef.value) return
  await nextTick()
  inputRef.value?.focus()
}

function blur() {
  inputRef.value?.blur()
}

function select() {
  inputRef.value?.select()
}

function clear() {
  model.value = ''
  emit('input', model.value)
  emit('update:modelValue', '')
}

function scrollTo() {
  inputRef.value?.scrollIntoView()
}

defineExpose<InputExposes>({
  focus,
  blur,
  select,
  clear,
  scrollTo
})
</script>
