<template>
  <canvas ref="canvas" :width="width" :height="height"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, PropType } from 'vue'
defineOptions({
  name: 'JvLineChart'
})
const props = defineProps({
  data: {
    type: Array as PropType<number[]>,
    required: true
  },
  width: {
    type: Number,
    default: 400
  },
  height: {
    type: Number,
    default: 400
  },
  color: {
    type: String,
    default: '#3498db' // 默认折线颜色
  }
})

const canvas = ref<HTMLCanvasElement | null>(null)

const drawLineChart = () => {
  if (!canvas.value) return

  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  const { data, width, height, color } = props
  const padding = 40
  const xStep = (width - 2 * padding) / (data.length - 1)
  const yMax = Math.max(...data)

  // 清空画布
  ctx.clearRect(0, 0, width, height)

  // 绘制横轴和纵轴
  ctx.beginPath()
  ctx.moveTo(padding, height - padding)
  ctx.lineTo(width - padding, height - padding)
  ctx.lineTo(width - padding, padding)
  ctx.strokeStyle = '#000'
  ctx.stroke()

  // 绘制数据折线
  ctx.beginPath()
  data.forEach((point, index) => {
    const x = padding + index * xStep
    const y = height - padding - (point / yMax) * (height - 2 * padding)
    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })

  ctx.strokeStyle = color
  ctx.stroke()

  // 绘制数据点
  data.forEach((point, index) => {
    const x = padding + index * xStep
    const y = height - padding - (point / yMax) * (height - 2 * padding)

    ctx.beginPath()
    ctx.arc(x, y, 5, 0, 2 * Math.PI)
    ctx.fillStyle = color
    ctx.fill()
  })
}

onMounted(drawLineChart)

watch(() => props.data, drawLineChart) // 当 data 改变时重新绘制图表
</script>

<style scoped>
canvas {
  border: 1px solid #ccc;
}
</style>
