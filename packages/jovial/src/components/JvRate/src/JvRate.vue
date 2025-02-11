<script setup lang="ts">
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
import type { JvRateEmits, JvRateProps, JvRateSlots } from './JvRate'
import JvIcon from '@components/JvIcon'
import { createNamespace } from '@jovial/utils'
import { computed, nextTick, onMounted, ref, useCssVars, watch } from 'vue'
import '../style/style.css'

defineOptions({ name: 'JvRate' })

const props = withDefaults(defineProps<JvRateProps>(), {
  modelValue: 0,
  max: 5,
  allowHalf: false,
  readonly: false,
  disabled: false,
  icon: '$star',
  voidIcon: '$starOutline',
  halfIcon: '$starHalfFull',
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
const currentValue = useModel(props, 'modelValue')
// SVG容器引用
const svgDefsRef = ref<HTMLElement | null>(null)
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

// 创建SVG渐变定义
function createSvgDefs() {
  if (!svgDefsRef.value)
    return
  // 清除现有的渐变定义
  svgDefsRef.value.innerHTML = ''

  // 为每个星级创建渐变定义
  for (let n = 1; n <= props.max; n++) {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
    const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')

    linearGradient.setAttribute('id', `grad-${n}`)
    linearGradient.setAttribute('x1', '0%')
    linearGradient.setAttribute('y1', '0%')
    linearGradient.setAttribute('x2', '100%')
    linearGradient.setAttribute('y2', '0%')

    const stops = [
      { offset: '0%', color: props.color, opacity: 1 },
      { offset: getCurPercentage(n - 1), color: props.color, opacity: 1 },
      { offset: getCurPercentage(n - 1), color: props.voidColor, opacity: 1 },
      { offset: '100%', color: props.voidColor, opacity: 1 },
    ]

    stops.forEach(({ offset, color }) => {
      const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
      stop.setAttribute('offset', offset)
      stop.setAttribute('stop-color', color)
      stop.setAttribute('stop-opacity', '1')
      linearGradient.appendChild(stop)
    })

    defs.appendChild(linearGradient)
    svgDefsRef.value.appendChild(defs)
  }
}
// 初始化时创建SVG渐变定义
onMounted(() => {
  nextTick(() => {
    createSvgDefs()
  })
})

// 监听显示值变化时创建SVG渐变定义
watch(() => displayValue.value, () => {
  createSvgDefs()
}, { flush: 'post' })

function getIconFill(value: number) {
  return `url(#grad-${value})`
}

function getCurPercentage(value: number) {
  if (value >= displayValue.value) {
    return '0%'
  }
  if (value + 1 <= displayValue.value) {
    return '100%'
  }
  // 计算部分填充的百分比
  const decimal = displayValue.value - Math.floor(displayValue.value)
  return `${decimal * 100}%`
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
  emit('change', value)
}

// 重置评分
function reset() {
  currentValue.value = 0
  hoverValue.value = -1
  emit('change', 0)
}

// 获取当前应该显示的图标
function getIcon(value: number, displayValue: number) {
  if (props.disabled || props.readonly) {
    // 禁用或只读状态下，根据当前值显示对应图标
    if (value <= displayValue || displayValue < value + 1) {
      return props.icon
    }
    return props.voidIcon
  }
  if (props.allowHalf) {
    // 半星模式
    if (value <= displayValue) {
      // 完整星星
      return props.icon
    }
    else if (value - 0.5 <= displayValue) {
      // 半星
      return props.halfIcon
    }
  }
  else {
    // 整星模式
    if (value <= displayValue || displayValue < value + 1) {
      return props.icon
    }
  }
  // // 未选中状态
  return props.voidIcon
}

useCssVars((_ctx) => {
  return {
    'jv-rate-gap': `${props.gap}px`,
  }
})

const iconSize = computed(() => {
  return props.size
})

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
    ]" @mouseleave="handleMouseleave"
  >
    <!-- SVG渐变定义容器 -->
    <svg ref="svgDefsRef" width="0" height="0" style="position: absolute; visibility: hidden;" />

    <!-- 图标列表 -->
    <TransitionGroup
      :class="bem.e('icons')"
      name="jv-rate-icon"
      tag="div"
    >
      <div
        v-for="n in max" :key="n" :class="bem.e('icon')" @mousemove="handleMousemove($event, n)" @mouseleave="handleMouseleave"
        @click="handleClick(displayValue)"
      >
        <JvIcon
          :name="getIcon(n, displayValue)"
          :size="iconSize"
          :fill="getIconFill(n)"
        />
      </div>
    </TransitionGroup>

    <!-- 提示文字 -->
    <Transition name="jv-rate-text">
      <div v-if="showText && displayValue > 0" :class="bem.e('text')">
        <slot name="text" :value="displayValue">
          <span>{{ text }}</span>
        </slot>
      </div>
    </Transition>
  </div>
</template>
