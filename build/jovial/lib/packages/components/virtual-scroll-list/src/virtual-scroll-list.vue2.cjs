'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var create = require('../../../utils/create.cjs');
var virtualScrollList = require('./virtual-scroll-list.cjs');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{ name: "JvVirtualScrollList" },
  __name: "virtual-scroll-list",
  props: virtualScrollList.virtualScrollListProps,
  emits: virtualScrollList.virtualScrollListEmits,
  setup(__props, { emit: __emit }) {
    const bem = create.createNamespace("virtual-scroll-list");
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(vue.unref(bem).b())
        },
        null,
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=virtual-scroll-list.vue2.cjs.map
