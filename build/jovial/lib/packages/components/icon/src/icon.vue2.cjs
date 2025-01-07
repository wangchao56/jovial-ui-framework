'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var common = require('../../../utils/common.cjs');
var create = require('../../../utils/create.cjs');
var icon = require('./icon.cjs');
var index = require('../../../../typings/index.cjs');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{ name: "JvIcon" },
  __name: "icon",
  props: icon.iconProps,
  setup(__props) {
    const bem = create.createNamespace("icon");
    const props = __props;
    const iconClass = vue.computed(() => {
      const baseClass = bem.b();
      const sizeClass = common.isString(props.size) && props.size.toUpperCase() in index.SizeOptions ? bem.m(props.size) : "";
      return [baseClass, sizeClass].filter(Boolean);
    });
    const iconStyle = vue.computed(() => {
      let result = {};
      if (props.color) {
        result.color = props.color;
      }
      if (props.size || common.isNumberExcludeNaN(props.size)) {
        result.fontSize = `${props.size}px`;
        result.lineHeight = `${props.size}px`;
        result.width = `${props.size}px`;
        result.maxHeight = `${props.size}px`;
      }
      return result;
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "i",
        {
          class: vue.normalizeClass(iconClass.value),
          style: vue.normalizeStyle(iconStyle.value)
        },
        [
          vue.renderSlot(_ctx.$slots, "default")
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=icon.vue2.cjs.map
