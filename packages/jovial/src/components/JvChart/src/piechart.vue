<script setup lang="ts">
import type { PropType } from 'vue'
import { onMounted, ref, watch } from 'vue'

defineOptions({
  name: 'JvPieChart',
})
defineProps({
  data: {
    type: Array as PropType<number[]>,
    required: true,
  },
  width: {
    type: Number as PropType<number>,
    default: 400,
  },
  height: {
    type: Number as PropType<number>,
    default: 400,
  },
  colors: {
    type: Array as PropType<string[]>,
    default: () => ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
  },
})

const canvas = ref<HTMLCanvasElement | null>(null)

function drawPieChart() {
  if (!canvas.value)
    return

  const ctx = canvas.value.getContext('2d')
  if (!ctx)
    return

  const { data, width, height, colors } = props
  const total = data.reduce((sum, value) => sum + value, 0)
  const radius = Math.min(width, height) / 2
  let startAngle = 0

  ctx.clearRect(0, 0, width, height) // 清空画布
  ctx.translate(width / 2, height / 2) // 移动坐标原点到中心

  data.forEach((value, index) => {
    const sliceAngle = (value / total) * 2 * Math.PI
    ctx.beginPath()
    ctx.arc(0, 0, radius, startAngle, startAngle + sliceAngle)
    ctx.lineTo(0, 0)
    ctx.fillStyle = colors[index % colors.length]
    ctx.fill()
    startAngle += sliceAngle
  })
}

onMounted(drawPieChart)

watch(() => props.data, drawPieChart) // 当 data 改变时重新绘制图表
</script>

<template>
  <canvas ref="canvas" :width="width" :height="height" />
</template>

<style scoped>
canvas {
  border: 1px solid #ccc;
}
</style>
