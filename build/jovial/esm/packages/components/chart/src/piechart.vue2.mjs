import { createElementBlock, defineComponent, onMounted, openBlock, ref, watch } from 'vue'

const _hoisted_1 = ['width', 'height']
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: 'JvPieChart',
  },
  __name: 'piechart',
  props: {
    data: {
      type: Array,
      required: true,
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    colors: {
      type: Array,
      default: () => ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
    },
  },
  setup(__props) {
    const props = __props
    const canvas = ref(null)
    const drawPieChart = () => {
      if (!canvas.value)
        return
      const ctx = canvas.value.getContext('2d')
      if (!ctx)
        return
      const { data, width, height, colors } = props
      const total = data.reduce((sum, value) => sum + value, 0)
      const radius = Math.min(width, height) / 2
      let startAngle = 0
      ctx.clearRect(0, 0, width, height)
      ctx.translate(width / 2, height / 2)
      data.forEach((value, index) => {
        const sliceAngle = value / total * 2 * Math.PI
        ctx.beginPath()
        ctx.arc(0, 0, radius, startAngle, startAngle + sliceAngle)
        ctx.lineTo(0, 0)
        ctx.fillStyle = colors[index % colors.length]
        ctx.fill()
        startAngle += sliceAngle
      })
    }
    onMounted(drawPieChart)
    watch(() => props.data, drawPieChart)
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock('canvas', {
        ref_key: 'canvas',
        ref: canvas,
        width: __props.width,
        height: __props.height,
      }, null, 8, _hoisted_1)
    }
  },
})

export { _sfc_main as default }
// # sourceMappingURL=piechart.vue2.mjs.map
