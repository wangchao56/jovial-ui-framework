import { withInstall } from '@jovial/utils'
import _barchart from './src/barchart.vue'
import _linechart from './src/linechart.vue'
import _piechart from './src/piechart.vue'

const JvBarChart = withInstall(_barchart)
const JvLineChart = withInstall(_linechart)
const JvPieChart = withInstall(_piechart)

export * from './src/chart'

export { JvBarChart, JvLineChart, JvPieChart }

declare module 'vue' {
  export interface GlobalComponents {
    JvBarChart: typeof JvBarChart
    JvLineChart: typeof JvLineChart
    JvPieChart: typeof JvPieChart
  }
}
