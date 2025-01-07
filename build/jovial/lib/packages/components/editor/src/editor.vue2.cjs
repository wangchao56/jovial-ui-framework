'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var create = require('../../../utils/create.cjs');
var editor = require('./editor.cjs');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{ name: "JvEditor" },
  __name: "editor",
  props: editor.editorProps,
  emits: editor.editorEmits,
  setup(__props, { emit: __emit }) {
    const bem = create.createNamespace("editor");
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
//# sourceMappingURL=editor.vue2.cjs.map
