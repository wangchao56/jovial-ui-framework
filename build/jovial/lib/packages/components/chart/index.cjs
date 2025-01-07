'use strict';

var barchart = require('./src/barchart.vue.cjs');
var linechart = require('./src/linechart.vue.cjs');
var piechart = require('./src/piechart.vue.cjs');
var withInstall = require('../../utils/with-install.cjs');
var chart = require('./src/chart.cjs');

const JvBarChart = withInstall.withInstall(barchart.default);
const JvLineChart = withInstall.withInstall(linechart.default);
const JvPieChart = withInstall.withInstall(piechart.default);

exports.chartProps = chart.chartProps;
exports.JvBarChart = JvBarChart;
exports.JvLineChart = JvLineChart;
exports.JvPieChart = JvPieChart;
//# sourceMappingURL=index.cjs.map
