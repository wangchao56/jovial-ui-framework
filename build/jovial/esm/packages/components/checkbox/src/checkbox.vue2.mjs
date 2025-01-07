import { defineComponent, useModel, ref, watch, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, withDirectives, isRef, vModelCheckbox, createCommentVNode, renderSlot, createTextVNode, toDisplayString } from 'vue';
import { createNamespace } from '../../../utils/create.mjs';
import { checkboxProps, checkboxEmits } from './checkbox.mjs';

const _hoisted_1 = ["disabled"];
const _hoisted_2 = { key: 1 };
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "jv-checkbox" },
  __name: "checkbox",
  props: checkboxProps,
  emits: checkboxEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const bem = createNamespace("checkbox");
    const model = useModel(props, "modelValue");
    const checkboxInputRef = ref();
    function handleChange(_) {
      emit("change", model.value);
    }
    function indeterminate(val) {
      if (!checkboxInputRef.value) return;
      checkboxInputRef.value.indeterminate = val;
    }
    watch(() => props.indeterminate, indeterminate);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(unref(bem).b())
        },
        [
          createElementVNode(
            "span",
            {
              class: normalizeClass(unref(bem).e("input"))
            },
            [
              withDirectives(createElementVNode("input", {
                type: "checkbox",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(model) ? model.value = $event : null),
                ref_key: "checkboxInputRef",
                ref: checkboxInputRef,
                disabled: _ctx.disabled,
                onChange: handleChange
              }, null, 40, _hoisted_1), [
                [vModelCheckbox, unref(model)]
              ])
            ],
            2
            /* CLASS */
          ),
          createCommentVNode(" \u4F7F\u7528 span \u6807\u7B7E\u5E76\u4FEE\u590D\u62FC\u5199\u9519\u8BEF "),
          _ctx.$slots.default || _ctx.label ? (openBlock(), createElementBlock(
            "span",
            {
              key: 0,
              class: normalizeClass(unref(bem).e("label"))
            },
            [
              createCommentVNode(" \u4F7F\u7528\u63D2\u69FD\u7684\u9ED8\u8BA4\u5185\u5BB9\u6216\u663E\u793A label "),
              _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }, () => [
                createTextVNode(
                  toDisplayString(_ctx.$slots.default),
                  1
                  /* TEXT */
                )
              ]) : (openBlock(), createElementBlock(
                "span",
                _hoisted_2,
                toDisplayString(_ctx.label),
                1
                /* TEXT */
              ))
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=checkbox.vue2.mjs.map
