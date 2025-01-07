import { defineComponent, openBlock, createElementBlock, normalizeClass, unref } from 'vue';
import { createNamespace } from '../../../utils/create.mjs';
import { dialogProps, dialogEmits } from './dialog.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "JvDialog" },
  __name: "dialog",
  props: dialogProps,
  emits: dialogEmits,
  setup(__props, { emit: __emit }) {
    const bem = createNamespace("dialog");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(unref(bem).b())
        },
        null,
        2
        /* CLASS */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=dialog.vue2.mjs.map
