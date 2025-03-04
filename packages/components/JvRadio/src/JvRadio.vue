<script setup lang="ts">
import type { JvRadioEmits, JvRadioProps } from './JvRadio'
import { createNamespace } from '@jienix/utils'
import { computed } from 'vue'
import { radioGroupContextKey } from './JvRadioGroup'

defineOptions({
  name: 'JvRadio',
})

const props = withDefaults(defineProps<JvRadioProps>(), {
  modelValue: false,
})
const emit = defineEmits<JvRadioEmits>()
const bem = createNamespace('radio')
const id = computed(() => `radio-${props.value}`)
const inputRef = ref<HTMLInputElement | null>(null)
const checked = ref<boolean>(false)
const radioGroupContext = inject(radioGroupContextKey)
const inputName = computed(() => radioGroupContext?.name || `radio-${props.value}`)
// 启用v-model
const model = useModel(props, 'modelValue')

// 判断props.value的类型
const valueType = computed(() => Object.prototype.toString.call(props.value))

const isDisabled = computed(() => {
  return props.disabled || (radioGroupContext?.disabled ?? false)
})

watchPostEffect(() => {
  // 如果复组件存在
  if (radioGroupContext) {
    checked.value = radioGroupContext.modelValue?.value === props.value
  }
  else {
    checked.value = model.value
  }
})

function handleChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (!target.checked) { // 如果取消选中，则不触发change事件
    return
  }
  // 触发父组件的change事件
  if (radioGroupContext) {
    radioGroupContext.dispatch('update:modelValue', target.value, valueType.value)
  }
  else { // 如果radioGroupContext不存在，则触发change事件
    model.value = target.checked
    emit('change', target.value)
  }
}
</script>

<template>
  <div :class="[bem.b(), bem.is('checked', checked), bem.is('disabled', isDisabled)]">
    <div :class="bem.e('icon-wrapper')">
      <JvIcon v-if="checked" name="$radio" :class="bem.e('icon')" :color="color" />
      <JvIcon v-else name="$radioOutline" :class="bem.e('icon')" :color="color" />
      <input
        :id="id" ref="inputRef" :value="value" :checked="checked" role="radio" type="radio" :disabled="isDisabled"
        :name="inputName" :aria-checked="checked" :aria-disabled="isDisabled" :tabindex="isDisabled ? -1 : 0"
        :class="bem.e('input')" @change="handleChange"
      >
    </div>

    <label :aria-label="label" :for="id" :class="bem.e('label')">
      <slot name="label">
        {{ label }}
      </slot>
    </label>
  </div>
</template>
