'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var chart = require('./chart.cjs');

const _hoisted_1 = ["width", "height"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "JvBarChart"
  },
  __name: "barchart",
  props: chart.chartProps,
  setup(__props) {
    const props = __props;
    const canvas = vue.ref(null);
    const drawChart = () => {
      if (!canvas.value) return;
      const ctx = canvas.value.getContext("2d");
      if (!ctx) return;
      const { data, width, height, color } = props;
      const barWidth = width / data.length;
      ctx.clearRect(0, 0, width, height);
      data.forEach((value, index) => {
        const barHeight = value / Math.max(...data) * height;
        ctx.fillStyle = color;
        ctx.fillRect(index * barWidth, height - barHeight, barWidth - 1, barHeight);
      });
    };
    vue.onMounted(drawChart);
    vue.watch(() => props.data, drawChart);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("canvas", {
        ref_key: "canvas",
        ref: canvas,
        width: _ctx.width,
        height: _ctx.height
      }, null, 8, _hoisted_1);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=barchart.vue2.cjs.map
