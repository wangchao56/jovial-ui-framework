<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { computed, ref } from 'vue'
import { jvSwitchEmits, type JvSwitchProps } from './JvSwitch'

defineOptions({ name: 'JvSwitch' })
const props = withDefaults(defineProps<JvSwitchProps>(), {
  modelValue: false,
  disabled: false,
  size: 'default',
  loading: false,
})
const emit = defineEmits(jvSwitchEmits)
const bem = createNamespace('switch')

// 内部状态
const innerValue = ref(props.modelValue)

// 处理点击事件
function handleClick() {
  if (props.disabled)
    return
  const newValue = !innerValue.value
  innerValue.value = newValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
// 计算类名
const switchClasses = computed(() => [
  bem.b(),
  bem.is('checked', innerValue.value),
  bem.is('disabled', props.disabled),
  bem.m(props.size),
])
</script>

<template>
  <div
    :class="switchClasses"
    role="switch"
    :aria-checked="innerValue"
    :aria-disabled="disabled"
    :tabindex="disabled ? -1 : 0"
    @click="handleClick"
  >
    <div :class="bem.e('core')">
      <div :class="bem.e('button')" />
    </div>
  </div>
</template>

<style src="./JvSwitch.css">
</style>
