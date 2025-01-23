<script setup lang="ts">
import type { InputEmits, InputExposes, InputProps, InputSlots } from './input'
import IconCloseThick from '@components/internal-icon/close-thick'
import IconEyeOff from '@components/internal-icon/IconEyeOff'
import IconEyeOn from '@components/internal-icon/IconEyeOn'
import { formItemProviderKey } from '@components/JvForm/src/form-item'
import JvIcon from '@components/JvIcon'
import { createNamespace, isEmpty } from '@jovial/utils'
import {
  computed,
  inject,
  nextTick,
  ref,
  useModel,
  watchEffect,
} from 'vue'
import '../style/input.css'

defineOptions({ name: 'JvInput' })
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  modelValue: '',
  clearable: false,
  size: 'medium',
  maxlength: undefined,
  minlength: undefined,
  autofocus: false,
  autosize: false,
  pair: false,
  rows: 1,
  round: false,
  separator: '',
  showCount: false,
})
const emit = defineEmits<InputEmits>()
defineSlots<InputSlots>()
const bem = createNamespace('input')
const formItemContext = inject(formItemProviderKey)
const inputRef = ref<HTMLInputElement>()
const inputValue = useModel(props, 'modelValue')
// 查看密码
const showPassword = ref(false)
watchEffect(async () => {
  if (formItemContext && !isEmpty(inputValue.value)) {
    try {
      await formItemContext.validate('change')
    }
    catch (error) {
      emit('error', error)
    }
  }
  if (props.type !== 'password') {
    showPassword.value = props.showPassword
  }
})

function toggleShowPassword() {
  showPassword.value = !showPassword.value
}
const showPwdVisible = computed(() => {
  return props.type === 'password' && !props.readonly && !props.disabled
})

const showClearable = computed(() => {
  return (
    !props.disabled && !props.readonly && !!inputValue.value && props.clearable
  )
})

const nativeType = computed(() => {
  if (props.type === 'password' && showPassword.value) {
    return 'text'
  }
  return props.type
})

// TODO: 事件
function emitInput(_e: Event) {
  emit('input', inputValue.value as string)
  // emit('update:modelValue', model.value)
}
function emitChange(_e: Event) {
  emit('change', inputValue.value as string)
}

function emitFocus(e: FocusEvent) {
  emit('focus', e)
}

async function emitBlur(e: FocusEvent) {
  if (formItemContext) {
    try {
      await formItemContext.validate('blur')
    }
    catch (error) {
      emit('error', error)
    }
  }
  emit('blur', e)
}
function emitKeydown(e: KeyboardEvent) {
  emit('keydown', e)
}

async function focus() {
  if (props.disabled)
    return
  if (props.readonly)
    return
  if (!inputRef.value)
    return
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
  inputValue.value = ''
  emit('input', inputValue.value)
  emit('update:modelValue', '')
  emit('change', '')
  nextTick(() => {
    inputRef.value?.focus()
  })
}

function scrollTo() {
  inputRef.value?.scrollIntoView()
}

defineExpose<InputExposes>({
  focus,
  blur,
  select,
  clear,
  scrollTo,
})
</script>

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
        v-model="inputValue"
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
      >
      <span v-if="showClearable" :class="bem.e('clear')" @click="clear">
        <JvIcon :size="size">
          <IconCloseThick />
        </JvIcon>
      </span>
      <span
        v-if="showPwdVisible"
        :class="bem.e('toggle')"
        @click="toggleShowPassword"
      >
        <JvIcon :size="size">
          <IconEyeOff v-if="showPassword" />
          <IconEyeOn v-else />
        </JvIcon>
      </span>

      <span v-if="$slots.suffix" :class="bem.e('suffix')">
        <slot name="suffix" />
      </span>
    </div>

    <div v-if="$slots.append" :class="bem.be('group', 'append')">
      <slot name="append" />
    </div>
  </div>
</template>
