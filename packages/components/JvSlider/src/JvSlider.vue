<script setup lang="ts">
import { createNamespace } from '@jienix/utils'
import { computed, ref, useId, watch } from 'vue'
import { useTheme } from '../@jienix/jovial-theme'
import { jvSliderEmits, jvSliderProps } from './JvSlider'
import '../style/style.css'

const props = defineProps(jvSliderProps)
const emit = defineEmits(jvSliderEmits)
const theme = useTheme()

const bem = createNamespace('slider')

// 使用 Vue 的 useId 生成唯一 ID
const listId = `jv-slider-${useId()}`

// 计算百分比
const percentage = computed(() => {
  const range = props.max - props.min
  return ((props.modelValue - props.min) / range) * 100
})

// 计算刻度点
const ticks = computed(() => {
  if (!props.showTicks && !Object.keys(props.marks).length)
    return []

  if (Object.keys(props.marks).length)
    return Object.keys(props.marks).map(Number)

  const result = []
  const total = (props.max - props.min) / props.step
  for (let i = 0; i <= total; i++) {
    const value = props.min + i * props.step
    result.push(value)
  }
  return result
})

// 获取刻度标签
function getTickLabel(value: number) {
  if (props.marks[value])
    return props.marks[value]
  return value.toString()
}

// 处理输入框值
const inputValue = ref(props.modelValue)
watch(() => props.modelValue, (val) => {
  inputValue.value = val
})

// 处理滑块拖动
function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  const value = Number(target.value)
  emit('update:modelValue', value)
  emit('input', value)
}

// 处理输入框变化
function handleInputChange(event: Event) {
  const target = event.target as HTMLInputElement
  let value = Number(target.value)

  // 约束值在范围内
  if (value < props.min)
    value = props.min
  if (value > props.max)
    value = props.max

  inputValue.value = value
  emit('update:modelValue', value)
  emit('change', value)
}

// 处理步进按钮
// function handleStep(increase: boolean) {
//   const newVal = props.modelValue + (increase ? props.step : -props.step)
//   if (newVal >= props.min && newVal <= props.max) {
//     emit('update:modelValue', newVal)
//     emit('change', newVal)
//   }
// }
</script>

<template>
  <div
    :class="[
      bem.b(),
      {
        'is-disabled': disabled,
        'is-vertical': orientation === 'vertical',
      },
      theme.themeClasses,
    ]"
  >
    <div v-if="showInput" :class="bem.e('input-wrapper')">
      <input
        v-model="inputValue"
        :class="bem.e('number-input')"
        type="number"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        @change="handleInputChange"
      >
    </div>

    <div :class="bem.e('runway')">
      <div
        :class="bem.e('bar')"
        :style="{ width: `${percentage}%` }"
      />

      <!-- 刻度点 -->
      <div
        v-for="tick in ticks"
        :key="tick"
        :class="[
          bem.e('tick'),
          { 'is-active': modelValue >= tick },
        ]"
        :style="{
          left: `${((tick - min) / (max - min)) * 100}%`,
        }"
      >
        <div
          v-if="props.marks[tick]"
          :class="bem.e('tick-label')"
        >
          {{ props.marks[tick] }}
        </div>
      </div>

      <input
        :class="bem.e('input')"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue"
        :disabled="disabled"
        :list="listId"
        @input="handleInput"
      >

      <!-- tooltip -->
      <div
        v-if="showTooltip"
        :class="bem.e('tooltip')"
        :style="{
          left: `${percentage}%`,
        }"
      >
        <slot name="tooltip" :value="modelValue">
          {{ modelValue }}
        </slot>
      </div>
    </div>

    <!-- 刻度标记 -->
    <div v-if="list" :class="bem.e('marks')">
      <slot
        v-for="tick in ticks"
        :key="tick"
        name="mark"
        :value="tick"
      >
        {{ tick }}
      </slot>
    </div>

    <!-- 刻度列表 -->
    <datalist :id="listId" :class="bem.e('marks')">
      <option
        v-for="tick in ticks"
        :key="tick"
        :value="tick"
        :label="getTickLabel(tick)"
      />
    </datalist>
  </div>
</template>

<style lang="css" scoped>
.slider {
  display: flex;
  align-items: center;
}

.slider input {
  margin-right: 8px;
}
</style>
