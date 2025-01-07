'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var props = require('./props.cjs');

var JvVirtualItem = vue.defineComponent({
  name: "Jv-virtual-item",
  props: props.virtualItemProps,
  emits: {
    itemResize: (key, size) => true
  },
  setup(props, { emit }) {
    const rootRef = ref(null);
    function dispatchResize() {
      var _a;
      emit(
        "itemResize",
        props.uniqueKey,
        ((_a = rootRef.value) == null ? undefined : _a.offsetHeight) || props.estimateSize || 0
      );
    }
    onMounted(() => {
      dispatchResize();
    });
    onUpdated(() => {
      dispatchResize();
    });
    return () => {
      const { component: Comp, uniqueKey, source, index } = props;
      return /* @__PURE__ */ React.createElement(React.Fragment, null, Comp ? /* @__PURE__ */ React.createElement("div", { ref: rootRef, key: uniqueKey, "data-index": index }, /* @__PURE__ */ React.createElement(Comp, { source })) : null);
    };
  }
});

exports.default = JvVirtualItem;
//# sourceMappingURL=virtual-item.setup.cjs.map
