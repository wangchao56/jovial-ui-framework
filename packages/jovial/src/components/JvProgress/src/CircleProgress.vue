<script setup lang="ts">
import type { CircleProgressProps } from './JvProgress'
import { createNamespace, csstoNumber, toCSSValue } from '@jovial/utils'
import { computed } from 'vue'
import '../style/circle-progress.css'

defineOptions({
  name: 'JvCircleProgress',
})

const props = withDefaults(defineProps<CircleProgressProps>(), {
  width: 120,
  strokeWidth: 6,
  strokeRadius: 15,
  percentage: 0,
  showText: true,
  strokeLinecap: 'round',
  format: (percentage: number) => `${percentage}%`,
})
const percentage = useModel(props, 'percentage')
const ns = createNamespace('circle-progress')
const center = computed(() => csstoNumber(props.width) / 2) // 计算圆心
const radius = computed(() => (csstoNumber(props.width) - props.strokeWidth) / 2) // 计算圆的半径 60

const circumference = computed(() => 2 * Math.PI * radius.value) // 计算圆周长
// 计算stroke-dashoffset
const dashOffset = computed(() => {
  const progress = percentage.value > 100 ? 100 : percentage.value < 0 ? 0 : percentage.value
  return circumference.value * (1 - progress / 100)
}) // 计算stroke-dashoffset

const strokeLinecap = computed(() => {
  return props.strokeLinecap || 'round'
})

const circleStyle = computed(() => ({
  transform: 'rotate(-90deg)',
  transformOrigin: 'center',
  animation: props.animation ? `circle-progress-rotate ${props.duration || 0.6}s ease-in-out` : 'none',
})) // 计算circle的样式
</script>

<template>
  <svg
    :width="toCSSValue(width)"
    :height="toCSSValue(width)"
    :viewBox="`0 0 ${width} ${width}`"
    :class="ns.b()"
  >
    <!-- 背景圆环 -->
    <circle
      :cx="center"
      :cy="center"
      :r="radius"
      :stroke="bgColor"
      :stroke-width="strokeWidth"
      fill="none"
      :class="ns.m('bg')"
    />
    <!-- 进度圆环 -->
    <circle
      :cx="center"
      :cy="center"
      :r="radius"
      :stroke="valueColor"
      :stroke-width="strokeWidth"
      :stroke-linecap="strokeLinecap"
      fill="none"
      :stroke-dasharray="circumference"
      :stroke-dashoffset="dashOffset"
      :class="ns.m('stroke')"
      :style="circleStyle"
    />
    <text
      v-if="showText"
      :x="center"
      :y="center"
      dominant-baseline="middle"
      text-anchor="middle"
      :class="ns.e('text')"
    >
      {{ format(percentage ?? 0) }}
    </text>
  </svg>
</template>

<style>
@keyframes circle-progress-rotate {
  from {
    transform: rotate(-90deg);
  }

  to {
    transform: rotate(270deg);
  }
}
</style>
