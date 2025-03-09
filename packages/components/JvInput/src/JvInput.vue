<!-- jovial-ui/components/JvInput.vue -->
<script setup lang="ts">
import { getUid } from '@jienix/utils'
import { onMounted, ref } from 'vue'
import { jvInputProps } from './JvInput'

defineOptions({
  name: 'JvInput',
  inheritAttrs: false,
})

defineProps(jvInputProps)

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'input'])

const id = ref(getUid())
const input = ref(null)
const isFocused = ref(false)

// 输入事件处理
function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
  emit('input', event)
}

// 焦点事件处理
function onFocus(event: FocusEvent) {
  isFocused.value = true
  emit('focus', event)
}

// 失焦事件处理
function onBlur(event: FocusEvent) {
  isFocused.value = false
  emit('blur', event)
}

// 清除事件处理
function onClear() {
  emit('update:modelValue', '')
}

// 挂载时生成唯一ID
onMounted(() => {
  if (!id.value) {
    id.value = getUid()
  }
})
</script>

<template>
  <div
    class="jv-input" :class="[
      {
        'jv-input--focused': isFocused,
        'jv-input--disabled': disabled,
        'jv-input--error': error,
        'jv-input--success': success,
        'jv-input--with-prefix': $slots.prefix || prefix,
        'jv-input--with-suffix': $slots.suffix || suffix,
        'jv-input--dense': dense,
        'jv-input--outlined': variant === 'outlined',
        'jv-input--filled': variant === 'filled',
        'jv-input--underlined': variant === 'underlined',
      },
    ]"
  >
    <label v-if="label" class="jv-input__label" :for="id">{{ label }}</label>

    <div class="jv-input__container">
      <div v-if="$slots.prefix || prefix" class="jv-input__prefix">
        <slot name="prefix">
          <i v-if="prefix" class="jv-icon" :class="prefix" />
        </slot>
      </div>

      <input
        :id="id" ref="input" class="jv-input__field" :value="modelValue" :type="type" :placeholder="placeholder"
        :disabled="disabled" :readonly="readonly" :required="required" :autocomplete="autocomplete" :min="min"
        :max="max" :step="step" :maxlength="maxlength" @input="onInput" @focus="onFocus" @blur="onBlur"
      >

      <div v-if="$slots.suffix || suffix || clearable" class="jv-input__suffix">
        <span v-if="clearable && modelValue" class="jv-input__clear-icon" @click="onClear">
          <i class="jv-icon jv-icon-close" />
        </span>
        <slot name="suffix">
          <i v-if="suffix" class="jv-icon" :class="suffix" />
        </slot>
      </div>
    </div>

    <div v-if="hint || error || success" class="jv-input__hint">
      <span :class="{ 'jv-input__hint--error': error, 'jv-input__hint--success': success }">
        {{ error || success || hint }}
      </span>
    </div>
  </div>
</template>
