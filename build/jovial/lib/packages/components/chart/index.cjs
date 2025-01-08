'use strict'

const withInstall = require('../../utils/with-install.cjs')
const barchart = require('./src/barchart.vue.cjs')
const chart = require('./src/chart.cjs')
const linechart = require('./src/linechart.vue.cjs')
const piechart = require('./src/piechart.vue.cjs')

const JvBarChart = withInstall.withInstall(barchart.default)
const JvLineChart = withInstall.withInstall(linechart.default)
const JvPieChart = withInstall.withInstall(piechart.default)

exports.chartProps = chart.chartProps
exports.JvBarChart = JvBarChart
exports.JvLineChart = JvLineChart
exports.JvPieChart = JvPieChart
// # sourceMappingURL=index.cjs.map
