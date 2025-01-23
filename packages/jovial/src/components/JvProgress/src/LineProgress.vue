<script setup lang='ts'>
import type { JvProgressSlots, LineProgressProps } from './JvProgress'
import { createNamespace, grey, info, shades } from '@jovial/utils'
import { useResizeObserver } from '@vueuse/core'
import { defineSizeStyle } from './constants'
import '../style/line-progress.css'

defineOptions({
  name: 'JvLineProgress',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<LineProgressProps>(), {
  textInside: false,
  textPosition: 'right',
  showText: false,
  strokeRadius: 16,
  strokeWidth: 6,
  size: 'medium',
  percentage: 0,
})
defineSlots<JvProgressSlots>()
const percentage = useModel(props, 'percentage')
const ns = createNamespace('line-progress')
const rootRef = ref<SVGSVGElement | null>(null)
// 进度条的长度计算
const progressLength = ref(0)
// 2. 简化监听逻辑,使用 watchEffect 替代 useResizeObserver
function updateProgressLength() {
  const svgWidth = rootRef.value?.width.baseVal.value ?? 0
  progressLength.value = svgWidth * (percentage.value / 100)
  if (progressLength.value < 0) {
    progressLength.value = 0
  }
  if (progressLength.value > svgWidth) {
    progressLength.value = svgWidth
  }
}

watch(percentage, (newValue) => {
  if (newValue < 0) {
    percentage.value = 0
  }
  if (newValue > 100) {
    percentage.value = 100
  }
})

watchEffect(updateProgressLength)
const resizeObserver = useResizeObserver(rootRef, updateProgressLength)
onUnmounted(() => {
  resizeObserver.stop()
})
// 组件的唯一id
const id = computed(() => `jv-line-progress-${useId()}`)
// 进度条对应的宽度和圆角
const progressProperty = computed(() => {
  const property = {
    strokeWidth: props.strokeWidth,
    strokeRadius: props.strokeRadius,
    fontSize: (props.showText && props.textInside) ? Math.max(props.strokeWidth - 2, 12) : Math.max(props.strokeWidth, 12),
    fontWeight: 400,
  }
  if (!props.size) {
    return property
  }
  return Object.assign({}, defineSizeStyle[props.size] || property)
})
const width = computed(() => props.width ?? 300)

// 计算内部文本的显示是跟随进度值实现的
const textInside = computed(() => props.textInside && props.showText)
// 显示位置
const textPosition = computed(() => props.textPosition ?? 'right')
// 3. 优化文本位置计算逻辑
const textOffset = computed(() => {
  const baseOffset = {
    x: 0,
    y: progressProperty.value.strokeWidth / 2,
    anchor: 'end' as const,
  }
  const positionMap = {
    left: {
      x: progressProperty.value.strokeWidth / 2,
      anchor: 'start' as const,
    },
    right: {
      x: progressLength.value - progressProperty.value.strokeWidth / 2,
      anchor: 'end' as const,
    },
    center: {
      x: progressLength.value / 2,
      anchor: 'middle' as const,
    },
  }

  return {
    ...baseOffset,
    ...positionMap[textPosition.value as keyof typeof positionMap],
  }
})
const textColor = computed(() => props.textInside ? shades.white : props.valueColor)

// 是否显示动画
const showAnimation = computed(() => percentage.value > 0 && percentage.value < 100)
// 5. 优化动画相关的计算属性
const ids = computed(() => ({
  animation: `progress-animation-${id.value}`,
  gradient: `progress-gradient-${id.value}`,
  shadow: `progress-shadow-${id.value}`,
}))
</script>

<template>
  <svg
    :id="id"
    ref="rootRef"
    :width="width"
    :height="progressProperty.strokeWidth"
    :viewBox="`0 0 ${width} ${progressProperty.strokeWidth}`"
    :class="ns.b()"
  >
    <defs>
      <!-- 现有的渐变定义 -->
      <linearGradient :id="ids.gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" :stop-color="shades.transparent" />
        <stop offset="50%" :stop-color="shades.highlight" />
        <stop offset="100%" :stop-color="shades.transparent" />
        <animate
          v-if="showAnimation"
          :id="ids.animation"
          attributeName="x1"
          from="-100%"
          to="100%"
          dur="1.5s"
          repeatCount="indefinite"
        />
        <animate
          v-if="showAnimation"
          attributeName="x2"
          from="0%"
          to="200%"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </linearGradient>

      <!-- 添加阴影滤镜 -->
      <filter :id="ids.shadow" x="-10%" y="-10%" width="120%" height="150%">
        <!-- 外阴影 -->
        <feDropShadow
          dx="0"
          dy="2"
          stdDeviation="2"
          :flood-color="valueColor ?? info.base"
          flood-opacity="0.3"
        />
        <!-- 内阴影 -->
        <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
        <feOffset dy="-1" dx="0" />
        <feComposite
          in2="SourceAlpha"
          operator="arithmetic"
          k2="-1"
          k3="1"
          result="shadowDiff"
        />
        <feFlood :flood-color="valueColor ?? info.base" flood-opacity="0.15" />
        <feComposite in2="shadowDiff" operator="in" />
        <feComposite in2="SourceGraphic" operator="over" />
      </filter>
    </defs>

    <!-- 背景线条 -->
    <rect
      :x="0"
      :y="0"
      :width="width"
      :height="progressProperty.strokeWidth"
      :rx="progressProperty.strokeRadius"
      :fill="bgColor ?? grey.lighten4"
      filter="url(#drop-shadow-bg)"
    />
    <!-- 进度线条组 -->
    <g :filter="`url(#${ids.shadow})`">
      <rect
        :x="0"
        :y="0"
        :width="progressLength"
        :height="progressProperty.strokeWidth"
        :rx="progressProperty.strokeRadius"
        :fill="valueColor ?? info.base"
      />
      <!-- 能量动画遮罩 -->
      <rect
        v-if="showAnimation"
        :x="0"
        :y="0"
        :width="progressLength"
        :height="progressProperty.strokeWidth"
        :rx="progressProperty.strokeRadius"
        :fill="`url(#${ids.gradient})`"
        style="mix-blend-mode: overlay;"
      />
      <!-- 添加高光效果 -->
      <rect
        v-if="showAnimation"
        :x="0"
        :y="0"
        :width="progressLength"
        :height="progressProperty.strokeWidth"
        :rx="progressProperty.strokeRadius"
        :fill="shades.highlight"
        style="mix-blend-mode: soft-light;"
      />
      <text
        v-if="textInside"
        :x="textOffset.x"
        :y="textOffset.y"
        :fill="textColor"
        :font-size="progressProperty.fontSize"
        :font-weight="progressProperty.fontWeight"
        :text-anchor="textOffset.anchor"
        dominant-baseline="central"
      >
        <slot>
          {{ ` ${percentage}% ` }}
        </slot>
      </text>
    </g>
  </svg>
</template>
