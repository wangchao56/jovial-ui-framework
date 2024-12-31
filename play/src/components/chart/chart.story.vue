<script setup lang="ts">
// import JvBarChart from '@jovial/components/chart/src/barchart.vue'
import { ref } from 'vue'

const chartData = ref([5, 10, 15, 20, 25, 30, 35])
const lineData = ref([5, 15, 10, 20, 25, 30, 22])
const pieData = ref([10, 20, 30, 40])
</script>
<template>
  <Story title="高级组件/图表">
    <Variant title="柱状图示例">
      <JvBarChart
        :data="chartData"
        :width="800"
        :height="400"
        color="#3498db"
      ></JvBarChart>
    </Variant>
    <Variant title="折线图示例">
      <JvLineChart
        :data="lineData"
        :width="800"
        :height="400"
        color="#3498db"
      ></JvLineChart>
    </Variant>
    <Variant title="饼状图示例">
      <JvPieChart
        :data="pieData"
        :width="800"
        :height="400"
        color="#3498db"
      ></JvPieChart>
    </Variant>
  </Story>
</template>
<docs lang="md"></docs>
