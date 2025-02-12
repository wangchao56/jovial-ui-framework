<script setup lang="ts">
import JvTooltip, { type TooltipProps } from '@components/JvTooltip'
import { createNamespace } from '@jovial/utils'
import { useDebounceFn, useResizeObserver } from '@vueuse/core'
import { computed, onUnmounted, ref } from 'vue'
import { getTextWidth, type JvEllipsisEmits } from './JvEllipsis'

// TODO: 优化
// 1. 优化检测逻辑
// 2. 优化样式
// 3. 优化Tooltip的显示

defineOptions({ name: 'JvEllipsis' })

const props = defineProps({
  text: {
    type: String,
    default: '',
    required: true,
  },
  maxWidth: [Number, String] as PropType<string | number>,
  rows: {
    type: Number,
    default: 1,
  },
  tooltip: {
    type: Object as PropType<TooltipProps>,
    default: () => ({}),
  },
})
defineEmits<JvEllipsisEmits>()
const bem = createNamespace('ellipsis')
const containerRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const markRef = ref<HTMLElement>()
const ellipsised = ref(false)
// 计算容器尺寸
const containerStyle = computed(() => {
  // 预估行高
  const expectedLG = 21
  const style: Record<string, string> = {
    display: 'inline-block',
    maxWidth: typeof props.maxWidth === 'number'
      ? `${props.maxWidth}px`
      : props.maxWidth || 'none',
    height: `${expectedLG * props.rows}px`,
  }
  return style
})
// 安全获取元素样式
function getSafeStyle(el: HTMLElement, prop: string) {
  try {
    return getComputedStyle(el).getPropertyValue(prop)
  }
  catch {
    return ''
  }
}

// 预期宽度
// 1.给定maxWidth，计算出预期宽度
// 2.没给maxWidth，通过父元素的宽度来计算

const expectedWidth = computed(() => {
  if (props.maxWidth && typeof props.maxWidth === 'number') {
    return props.maxWidth
  }
  // 3. 没给maxWidth，通过父元素的宽度来计算
  const parent = containerRef.value?.parentElement
  if (!parent)
    return 0
  return getSafeStyle(parent, 'width')
})

// 增强的检测逻辑
const checkEllipsis = useDebounceFn(() => {
  console.log(1)

  try {
    if (!containerRef.value || !contentRef.value)
      return

    // 安全测量容器尺寸
    const container = containerRef.value
    const content = contentRef.value
    const lineHeight = Math.max(
      1,
      Number.parseFloat(getSafeStyle(container, 'line-height')) || 1.2
      * Number.parseFloat(getSafeStyle(container, 'font-size')) || 16,
    )
    // 预期高度
    const expectedHeight = lineHeight * props.rows
    const textWidth = getTextWidth(props.text, container)
    // 实际高度
    // 检测是否需要省略
    if (textWidth / Number.parseFloat(expectedWidth.value?.toString() || '0') > props.rows) {
      ellipsised.value = true
      container.style.height = `${expectedHeight}px`
      content.style.height = `${expectedHeight}px`
    }
    else {
      ellipsised.value = false
      container.style.height = 'fit-content'
      content.style.height = 'fit-content'
    }
  }
  catch (error) {
    console.error('Ellipsis检测错误:', error)
    ellipsised.value = false
  }
}, 50, { maxWait: 500 })

// 响应式检测
const { stop } = useResizeObserver(containerRef, () => {
  requestAnimationFrame(checkEllipsis)
})

// 文本变化和rows变化时重新计算
// 增强的响应式处理
watch(() => [
  props.text,
  props.maxWidth,
  props.rows,
], checkEllipsis, { immediate: true })
onUnmounted(stop)
</script>

<template>
  <div ref="containerRef" :class="bem.b()" :style="containerStyle">
    <div ref="contentRef" class="content">
      <JvTooltip
        v-if="ellipsised" class="more" :content="text" placement="top"
        v-bind="tooltip" :popper-class="bem.e('popper')"
      >
        <span ref="markRef">...</span>
      </JvTooltip>
      <p class="text">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<style>
.jv-ellipsis {
  overflow: hidden;
  max-height: fit-content;

  .content {
    position: relative;
    overflow: hidden;
  }

  p {
    margin: 0;
  }

  .text {
    font: inherit;
    word-wrap: break-word;
    text-align: justify;
    word-break: break-all;
    text-overflow: ellipsis;
  }

  .more {
    display: flex;
    float: right;
    width: fit-content;
    height: 100%;
    vertical-align: text-bottom;
    flex-direction: column-reverse;
    shape-outside: inset(calc(100% - 1lh) 0 0);
    clip-path: inset(calc(100% - 1lh) 0 0 0);
  }
}

/* 多行模式 */
.jv-ellipsis[style*='-webkit-line-clamp'] {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  white-space: normal;
}

.jv-ellipsis__popper {
  max-width: 500px !important;
  text-wrap: pretty;
  word-break: break-all;
  word-wrap: break-word;
}
</style>
