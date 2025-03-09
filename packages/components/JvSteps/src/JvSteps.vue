<script setup lang="ts">
import type { JvStepsEmits, JvStepsSlots, StepItem } from './JvSteps'
import JvIcon from '@components/JvIcon'
import { createNamespace } from '@jienix/utils'
import { ref, watch } from 'vue'

import { jvStepsProps } from './JvSteps'

defineOptions({ name: 'JvSteps' })

const props = defineProps(jvStepsProps)

const emit = defineEmits<JvStepsEmits>()
defineSlots<JvStepsSlots>()
const bem = createNamespace('steps')

// 当前步骤
const currentStep = ref(props.modelValue)

// 计算每个步骤的状态
function getStepStatus(index: number) {
  if (props.items[index].status) {
    return props.items[index].status
  }

  if (index < currentStep.value) {
    return 'finish'
  }
  else if (index === currentStep.value) {
    return 'process'
  }
  else {
    return 'wait'
  }
}

// 处理步骤点击
function handleStepClick(index: number, item: StepItem) {
  if (props.disabled || item.disabled || !props.clickable)
    return

  currentStep.value = index
  emit('update:modelValue', index)
  emit('click', index, item)
}

// 监听步骤变化
watch(
  () => props.modelValue,
  (val) => {
    currentStep.value = val
  },
)
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.m(direction),
      bem.is('disabled', disabled),
    ]"
  >
    <div
      v-for="(item, index) in items" :key="index" :class="[
        bem.e('item'),
        bem.is('clickable', clickable && !disabled && !item.disabled),
        bem.is('disabled', item.disabled),
        bem.m(getStepStatus(index)),
      ]" @click="handleStepClick(index, item)"
    >
      <!-- 步骤图标/序号 -->
      <div :class="bem.e('icon')">
        <!-- 自定义图标 -->
        <template v-if="$slots.icon">
          <slot name="icon" :item="item" :index="index" :active="index === currentStep" />
        </template>

        <!-- 默认图标 -->
        <template v-else>
          <template v-if="item.icon">
            <JvIcon :name="item.icon" />
          </template>
          <template v-else-if="showIndex">
            {{ index + 1 }}
          </template>
        </template>
      </div>

      <!-- 连接线 -->
      <div v-if="showLine && index < items.length - 1" :class="bem.e('line')" />

      <!-- 内容区域 -->
      <div :class="bem.e('content')">
        <!-- 标题 -->
        <div :class="bem.e('title')">
          <template v-if="$slots.title">
            <slot name="title" :item="item" :index="index" :active="index === currentStep" />
          </template>
          <template v-else>
            {{ item.title }}
          </template>
        </div>

        <!-- 描述 -->
        <div v-if="item.description || $slots.description" :class="bem.e('description')">
          <template v-if="$slots.description">
            <slot name="description" :item="item" :index="index" :active="index === currentStep" />
          </template>
          <template v-else>
            {{ item.description }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
