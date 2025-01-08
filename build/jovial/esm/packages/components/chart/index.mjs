import { withInstall } from '../../utils/with-install.mjs'
import _barchart from './src/barchart.vue.mjs'
import _linechart from './src/linechart.vue.mjs'
import _piechart from './src/piechart.vue.mjs'

export { chartProps } from './src/chart.mjs'

const JvBarChart = withInstall(_barchart)
const JvLineChart = withInstall(_linechart)
const JvPieChart = withInstall(_piechart)

export { JvBarChart, JvLineChart, JvPieChart }
// # sourceMappingURL=index.mjs.map
