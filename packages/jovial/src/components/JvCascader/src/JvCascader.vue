<script setup lang="ts">
import type { CascaderOption, JvCascaderEmits } from './JvCascader'
import { createNamespace } from '@jovial/utils'
import { ref, watch } from 'vue'
import { jvCascaderProps } from './JvCascader'
import '../style/style.css'

defineOptions({ name: 'JvCascader' })
defineProps(jvCascaderProps)
const emit = defineEmits<JvCascaderEmits>()

const bem = createNamespace('cascader')
const visible = ref(false)
const selectedOptions = ref<CascaderOption[]>([])
const activeOptions = ref<CascaderOption[][]>([[]])
const inputValue = ref('')

// 处理选项点击
function handleOptionClick(option: CascaderOption, level: number) {
  selectedOptions.value = selectedOptions.value.slice(0, level)
  selectedOptions.value.push(option)

  if (!option.children) {
    const values = selectedOptions.value.map(opt => opt.value)
    emit('update:modelValue', values)
    emit('change', values)
    visible.value = false
  }
  else {
    activeOptions.value = activeOptions.value.slice(0, level + 1)
    activeOptions.value.push(option.children)
  }
}

// 处理下拉框显示状态变化
watch(visible, (val) => {
  emit('visibleChange', val)
})

// 暴露方法
defineExpose({
  focus: () => {
    // 实现获取焦点逻辑
  },
  blur: () => {
    visible.value = false
  },
})
</script>

<template>
  <div :class="bem.b()">
    <div
      :class="bem.e('input')"
      @click="visible = !disabled && !visible"
    >
      <input
        v-model="inputValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="!filterable"
        :class="bem.e('input-inner')"
      >
    </div>

    <div
      v-show="visible"
      :class="bem.e('dropdown')"
    >
      <div :class="bem.e('panel')">
        <div
          v-for="(options, level) in activeOptions"
          :key="level"
          :class="bem.e('menu')"
        >
          <div
            v-for="option in options"
            :key="option.value"
            :class="[
              bem.e('node'),
              bem.is('disabled', option.disabled),
              bem.is('active', selectedOptions[level]?.value === option.value),
            ]"
            @click="!option.disabled && handleOptionClick(option, level)"
          >
            {{ option.label }}
            <span
              v-if="option.children"
              :class="bem.e('arrow')"
            >
              >
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
