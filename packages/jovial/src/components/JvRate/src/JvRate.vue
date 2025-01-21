/**
 * Rate 组件实现了以下功能：
 * 1. 基础评分功能
 * 2. 支持半选模式
 * 3. 自定义图标和颜色
 * 4. 只读和禁用状态
 * 5. 提示文字显示
 * 6. 自定义间距和大小
 * 7. 完整的类型定义
 */

<script setup lang="ts">
import type { JvRateEmits, JvRateProps, JvRateSlots } from './JvRate'
import JvIcon from '@components/JvIcon'
import { createNamespace } from '@jovial/utils'
import { computed, ref } from 'vue'
import '../style/style.css'

defineOptions({ name: 'JvRate' })

const props = withDefaults(defineProps<JvRateProps>(), {
  modelValue: 0,
  max: 5,
  allowHalf: false,
  readonly: false,
  disabled: false,
  icon: 'star',
  voidIcon: 'star-outline',
  size: 20,
  gap: 4,
  color: '#fadb14',
  voidColor: '#c0c4cc',
  showText: false,
  texts: () => ['极差', '失望', '一般', '满意', '惊喜'],
})

const emit = defineEmits<JvRateEmits>()
defineSlots<JvRateSlots>()
const bem = createNamespace('rate')

// 当前值
const currentValue = ref(props.modelValue)
// 鼠标悬停值
const hoverValue = ref(-1)

// 显示值
const displayValue = computed(() => {
  return hoverValue.value >= 0 ? hoverValue.value : currentValue.value
})

// 提示文字
const text = computed(() => {
  const value = Math.ceil(displayValue.value) - 1
  return props.texts[value] || ''
})

// 计算图标样式
function getIconStyle(value: number) {
  const style: Record<string, string> = {}

  if (props.size) {
    style.fontSize = `${props.size}px`
  }

  if (props.gap && value !== props.max) {
    style.marginRight = `${props.gap}px`
  }

  if (value <= displayValue.value) {
    style.color = props.color
  }
  else {
    style.color = props.voidColor
  }

  return style
}

// 处理鼠标移入
function handleMousemove(event: MouseEvent, value: number) {
  if (props.disabled || props.readonly)
    return

  const target = event.target as HTMLElement
  const rect = target.getBoundingClientRect()
  const half = props.allowHalf && event.clientX - rect.left < rect.width / 2

  hoverValue.value = half ? value - 0.5 : value
  emit('hover', hoverValue.value)
}

// 处理鼠标移出
function handleMouseleave() {
  if (props.disabled || props.readonly)
    return

  hoverValue.value = -1
}

// 处理点击
function handleClick(value: number) {
  if (props.disabled || props.readonly)
    return

  currentValue.value = value
  emit('update:modelValue', value)
  emit('change', value)
}

// 重置评分
function reset() {
  currentValue.value = 0
  hoverValue.value = -1
  emit('update:modelValue', 0)
  emit('change', 0)
}

// 暴露方法
defineExpose({
  reset,
})
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.is('disabled', disabled),
      bem.is('readonly', readonly),
    ]"
    @mouseleave="handleMouseleave"
  >
    <!-- 图标列表 -->
    <div :class="bem.e('icons')">
      <div
        v-for="n in max"
        :key="n"
        :class="bem.e('icon')"
        @mousemove="handleMousemove($event, n)"
        @click="handleClick(n)"
      >
        <!-- 自定义图标 -->
        <template v-if="$slots.icon">
          <slot
            name="icon"
            :value="n"
            :active="n <= displayValue"
          />
        </template>

        <!-- 默认图标 -->
        <template v-else>
          <JvIcon
            :name="n <= displayValue ? icon : voidIcon"
            :style="getIconStyle(n)"
          />

          <!-- 半选图标 -->
          <JvIcon
            v-if="allowHalf && n - 0.5 === displayValue"
            :name="icon"
            :class="bem.e('half')"
            :style="getIconStyle(n)"
          />
        </template>
      </div>
    </div>

    <!-- 提示文字 -->
    <div
      v-if="showText && displayValue > 0"
      :class="bem.e('text')"
    >
      <template v-if="$slots.text">
        <slot
          name="text"
          :value="displayValue"
        />
      </template>
      <template v-else>
        {{ text }}
      </template>
    </div>
  </div>
</template>
