'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var create = require('../../../utils/create.cjs');
var checkbox = require('./checkbox.cjs');

const _hoisted_1 = ["disabled"];
const _hoisted_2 = { key: 1 };
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{ name: "jv-checkbox" },
  __name: "checkbox",
  props: checkbox.checkboxProps,
  emits: checkbox.checkboxEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const bem = create.createNamespace("checkbox");
    const model = vue.useModel(props, "modelValue");
    const checkboxInputRef = vue.ref();
    function handleChange(_) {
      emit("change", model.value);
    }
    function indeterminate(val) {
      if (!checkboxInputRef.value) return;
      checkboxInputRef.value.indeterminate = val;
    }
    vue.watch(() => props.indeterminate, indeterminate);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(vue.unref(bem).b())
        },
        [
          vue.createElementVNode(
            "span",
            {
              class: vue.normalizeClass(vue.unref(bem).e("input"))
            },
            [
              vue.withDirectives(vue.createElementVNode("input", {
                type: "checkbox",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(model) ? model.value = $event : null),
                ref_key: "checkboxInputRef",
                ref: checkboxInputRef,
                disabled: _ctx.disabled,
                onChange: handleChange
              }, null, 40, _hoisted_1), [
                [vue.vModelCheckbox, vue.unref(model)]
              ])
            ],
            2
            /* CLASS */
          ),
          vue.createCommentVNode(" \u4F7F\u7528 span \u6807\u7B7E\u5E76\u4FEE\u590D\u62FC\u5199\u9519\u8BEF "),
          _ctx.$slots.default || _ctx.label ? (vue.openBlock(), vue.createElementBlock(
            "span",
            {
              key: 0,
              class: vue.normalizeClass(vue.unref(bem).e("label"))
            },
            [
              vue.createCommentVNode(" \u4F7F\u7528\u63D2\u69FD\u7684\u9ED8\u8BA4\u5185\u5BB9\u6216\u663E\u793A label "),
              _ctx.$slots.default ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }, () => [
                vue.createTextVNode(
                  vue.toDisplayString(_ctx.$slots.default),
                  1
                  /* TEXT */
                )
              ]) : (vue.openBlock(), vue.createElementBlock(
                "span",
                _hoisted_2,
                vue.toDisplayString(_ctx.label),
                1
                /* TEXT */
              ))
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=checkbox.vue2.cjs.map
