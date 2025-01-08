const chartProps = {
  data: {
    type: Array,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    default: '#3498db',
    // 默认柱状图颜色
  },
}

export { chartProps }
// # sourceMappingURL=chart.mjs.map
