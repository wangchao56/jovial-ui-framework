<script setup lang="ts">
import type { JvTextareaEmits } from './JvTextarea'
import { createNamespace } from '@jienix/utils'
import { templateRef, useResizeObserver } from '@vueuse/core'
import { computed, nextTick, onMounted, useModel } from 'vue'
import { jvTextareaProps } from './JvTextarea'

defineOptions({ name: 'JvTextarea', inheritAttrs: false })
const props = defineProps(jvTextareaProps)
const emit = defineEmits<JvTextareaEmits>()
const bem = createNamespace('textarea')
const internalValue = useModel(props, 'modelValue')
const textareaRef = templateRef<HTMLTextAreaElement>('textarea')

const textLength = computed(() => internalValue.value.length)

// 自动调整高度
async function updateTextareaHeight() {
  if (!props.autosize || !textareaRef.value)
    return
  await nextTick()
  const textarea = textareaRef.value
  textarea.style.height = 'auto'
  textarea.style.height = `${textarea.scrollHeight}px`
}

onMounted(() => {
  if (props.autosize) {
    useResizeObserver(textareaRef, () => updateTextareaHeight())
    updateTextareaHeight()
  }
})

function handleInput(event: Event) {
  emit('input', event)
  if (props.autosize) {
    updateTextareaHeight()
  }
}

function handleChange(event: Event) {
  emit('change', (event.target as HTMLTextAreaElement).value)
}

function handleBlur(event: FocusEvent) {
  emit('blur', event)
}

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

function handleClear() {
  internalValue.value = ''
  emit('clear')
}

defineExpose({
  clear: handleClear,
})
</script>

<template>
  <div :class="bem.b()">
    <textarea
      :id="id" ref="textareaRef" v-model="internalValue" :class="bem.e('textarea')" :disabled="disabled"
      :readonly="readonly" :maxlength="maxlength" :minlength="minlength" :placeholder="placeholder"
      :autofocus="autofocus" :spellcheck="spellcheck" :wrap="wrap" :rows="rows" :cols="cols"
      :autocapitalize="autocapitalize" :autocomplete="autocomplete" :name="name" :form="form" :dir="dirname"
      @input="handleInput" @change="handleChange" @blur="handleBlur" @focus="handleFocus"
    />
    <span v-if="showWordLimit && maxlength" :class="bem.e('word-count')">
      {{ textLength }}/{{ maxlength }}
    </span>
  </div>
</template>
