import { createElementBlock, defineComponent, onMounted, openBlock, ref, watch } from 'vue'
import { chartProps } from './chart.mjs'

const _hoisted_1 = ['width', 'height']
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: 'JvBarChart',
  },
  __name: 'barchart',
  props: chartProps,
  setup(__props) {
    const props = __props
    const canvas = ref(null)
    const drawChart = () => {
      if (!canvas.value)
        return
      const ctx = canvas.value.getContext('2d')
      if (!ctx)
        return
      const { data, width, height, color } = props
      const barWidth = width / data.length
      ctx.clearRect(0, 0, width, height)
      data.forEach((value, index) => {
        const barHeight = value / Math.max(...data) * height
        ctx.fillStyle = color
        ctx.fillRect(index * barWidth, height - barHeight, barWidth - 1, barHeight)
      })
    }
    onMounted(drawChart)
    watch(() => props.data, drawChart)
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock('canvas', {
        ref_key: 'canvas',
        ref: canvas,
        width: _ctx.width,
        height: _ctx.height,
      }, null, 8, _hoisted_1)
    }
  },
})

export { _sfc_main as default }
// # sourceMappingURL=barchart.vue2.mjs.map
