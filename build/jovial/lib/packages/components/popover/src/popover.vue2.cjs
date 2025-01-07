'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var create = require('../../../utils/create.cjs');
var popover = require('./popover.cjs');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{ name: "JvPopover" },
  __name: "popover",
  props: popover.popoverProps,
  emits: popover.popoverEmits,
  setup(__props, { emit: __emit }) {
    const bem = create.createNamespace("popover");
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
//# sourceMappingURL=popover.vue2.cjs.map
