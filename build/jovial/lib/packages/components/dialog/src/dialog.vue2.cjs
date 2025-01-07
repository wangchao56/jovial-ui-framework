'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var create = require('../../../utils/create.cjs');
var dialog = require('./dialog.cjs');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{ name: "JvDialog" },
  __name: "dialog",
  props: dialog.dialogProps,
  emits: dialog.dialogEmits,
  setup(__props, { emit: __emit }) {
    const bem = create.createNamespace("dialog");
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
//# sourceMappingURL=dialog.vue2.cjs.map
