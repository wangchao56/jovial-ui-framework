import { defineComponent, ref, onMounted, watch, openBlock, createElementBlock } from 'vue';

const _hoisted_1 = ["width", "height"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "JvLineChart"
  },
  __name: "linechart",
  props: {
    data: {
      type: Array,
      required: true
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    color: {
      type: String,
      default: "#3498db"
      // 默认折线颜色
    }
  },
  setup(__props) {
    const props = __props;
    const canvas = ref(null);
    const drawLineChart = () => {
      if (!canvas.value) return;
      const ctx = canvas.value.getContext("2d");
      if (!ctx) return;
      const { data, width, height, color } = props;
      const padding = 40;
      const xStep = (width - 2 * padding) / (data.length - 1);
      const yMax = Math.max(...data);
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.moveTo(padding, height - padding);
      ctx.lineTo(width - padding, height - padding);
      ctx.lineTo(width - padding, padding);
      ctx.strokeStyle = "#000";
      ctx.stroke();
      ctx.beginPath();
      data.forEach((point, index) => {
        const x = padding + index * xStep;
        const y = height - padding - point / yMax * (height - 2 * padding);
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.strokeStyle = color;
      ctx.stroke();
      data.forEach((point, index) => {
        const x = padding + index * xStep;
        const y = height - padding - point / yMax * (height - 2 * padding);
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
      });
    };
    onMounted(drawLineChart);
    watch(() => props.data, drawLineChart);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("canvas", {
        ref_key: "canvas",
        ref: canvas,
        width: __props.width,
        height: __props.height
      }, null, 8, _hoisted_1);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=linechart.vue2.mjs.map
