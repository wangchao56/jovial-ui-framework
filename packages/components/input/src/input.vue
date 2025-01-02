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
      />
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
<script setup lang="ts">
import {
  ref,
  useSlots,
  nextTick,
  inject,
  computed,
  useModel,
  useAttrs,
  watchEffect,
  watch
} from 'vue'
import { createNamespace, isEmpty } from '@jovial/utils'
import { InputEmits, InputExposes, InputPropsType, InputSlots } from './input'

import IconEyeOff from '@jovial/components/internal-icon/IconEyeOff'
import IconEyeOn from '@jovial/components/internal-icon/IconEyeOn'
import IconCloseThick from '@jovial/components/internal-icon/close-thick'
import { formItemProviderKey, formProviderKey } from '../../form'

const formItemContext = inject(formItemProviderKey)
const formContext = inject(formProviderKey)

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
const attrs = useAttrs()
const bem = createNamespace('input')
const inputRef = ref<HTMLInputElement>()
const inputValue = useModel(props, 'modelValue')

watchEffect(async () => {
  if (formItemContext && !isEmpty(inputValue.value)) {
    try {
      await formItemContext.validate('change')
    } catch (error) {
      emit('error', error)
    }
  }
})

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
function emitInput(e: Event) {
  emit('input', inputValue.value as string)
  // emit('update:modelValue', model.value)
}
function emitChange(e: Event) {
  emit('change', inputValue.value as string)
}

function emitFocus(e: FocusEvent) {
  emit('focus', e)
}

async function emitBlur(e: FocusEvent) {
  if (formItemContext) {
    try {
      await formItemContext.validate('blur')
    } catch (error) {
      emit('error', error)
    }
  }
  emit('blur', e)
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
  scrollTo
})
</script>
