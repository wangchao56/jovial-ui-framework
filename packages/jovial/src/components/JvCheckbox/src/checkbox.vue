<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { ref, useModel, watch } from 'vue'
import { checkboxEmits, checkboxProps } from './checkbox'

defineOptions({ name: 'JvCheckbox' })
const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmits)
const bem = createNamespace('checkbox')
const model = useModel(props, 'modelValue')
const checkboxInputRef = ref<HTMLInputElement>()

function handleChange(_: Event) {
  emit('change', model.value)
}
function indeterminate(val: boolean) {
  if (!checkboxInputRef.value)
    return // 待实现
  // 待实现
  checkboxInputRef.value!.indeterminate = val
}
watch(() => props.indeterminate, indeterminate)
</script>

<template>
  <div :class="bem.b()">
    <span :class="bem.e('input')">
      <input
        ref="checkboxInputRef"
        v-model="model"
        type="checkbox"
        :disabled="disabled"
        @change="handleChange"
      >
    </span>
    <!-- 使用 span 标签并修复拼写错误 -->
    <span v-if="$slots.default || label" :class="bem.e('label')">
      <!-- 使用插槽的默认内容或显示 label -->
      <slot v-if="$slots.default">{{ $slots.default }}</slot>
      <span v-else>{{ label }}</span>
    </span>
  </div>
</template>
