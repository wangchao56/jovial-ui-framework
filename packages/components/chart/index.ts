import _barchart from './src/barchart.vue'
import _linechart from './src/linechart.vue'
import _piechart from './src/piechart.vue'
import { withInstall } from '@jovial/utils'

const barchart = withInstall(_barchart)
const linechart = withInstall(_linechart)
const piechart = withInstall(_piechart)

export * from './src/chart'

export default {
  JvBarChart: barchart,
  JvLineChart: linechart,
  JvPieChart: piechart
}

declare module 'vue' {
  export interface GlobalComponents {
    JvBarChart: typeof barchart
    JvLineChart: typeof linechart
    JvPieChart: typeof piechart
  }
}
