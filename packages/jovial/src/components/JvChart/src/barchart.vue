<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { chartProps } from './chart'

defineOptions({
  name: 'JvBarChart',
})

const props = defineProps(chartProps)

const canvas = ref<HTMLCanvasElement | null>(null)

function drawChart() {
  if (!canvas.value)
    return

  const ctx = canvas.value.getContext('2d')
  if (!ctx)
    return

  const { data, width, height, color } = props
  const barWidth = width / data.length
  ctx.clearRect(0, 0, width, height) // 清空画布

  // 绘制柱状图
  data.forEach((value, index) => {
    const barHeight = (value / Math.max(...data)) * height // 计算柱高
    ctx.fillStyle = color
    ctx.fillRect(index * barWidth, height - barHeight, barWidth - 1, barHeight) // 绘制矩形
  })
}

onMounted(drawChart)

watch(() => props.data, drawChart) // 当 data 改变时重新绘制图表
</script>

<template>
  <canvas ref="canvas" :width="width" :height="height" />
</template>

<style scoped>
canvas {
  border: 1px solid #ccc;
}
</style>
