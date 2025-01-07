import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, unref, normalizeStyle, renderSlot, createCommentVNode, createVNode, withCtx, createElementVNode } from 'vue';
import { createNamespace } from '../../../utils/create.mjs';
import { buttonProps } from './button.mjs';
import '../../internal-icon/close-thick.mjs';
import '../../internal-icon/IconEyeOff.mjs';
import '../../internal-icon/IconEyeOn.mjs';
import Loading from '../../internal-icon/Loading.mjs';
import '../../internal-icon/Switcher.mjs';
import _sfc_main$1 from '../../icon/src/icon.vue2.mjs';

const _hoisted_1 = ["disabled", "type", "autofocus"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "JvButton",
    inheritAttrs: true
  },
  __name: "button",
  props: buttonProps,
  emits: ["click", "mousedown", "keydown"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const bem = createNamespace("button");
    function emitClick(e) {
      emit("click", e);
    }
    function emitMouseDown(e) {
      emit("mousedown", e);
    }
    const buttonStyle = computed(() => {
      let result = {};
      if (props.color) {
        result["color"] = props.color;
      }
      if (props.bgColor) {
        result["background-color"] = props.bgColor;
      }
      return result;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        class: normalizeClass([
          unref(bem).b(),
          unref(bem).m(_ctx.type),
          unref(bem).m(_ctx.size),
          unref(bem).m(_ctx.variant),
          unref(bem).is("dashed", _ctx.dashed),
          unref(bem).is("rounded", _ctx.rounded),
          unref(bem).is("loading", _ctx.loading),
          unref(bem).is("disabled", _ctx.disabled),
          unref(bem).is("block", _ctx.block),
          unref(bem).is("stacked", _ctx.stacked)
        ]),
        disabled: _ctx.loading || _ctx.disabled,
        style: normalizeStyle(buttonStyle.value),
        type: _ctx.nativeType,
        autofocus: _ctx.autofocus,
        onClick: emitClick,
        onMousedown: emitMouseDown
      }, [
        _ctx.$slots.prepend ? (openBlock(), createElementBlock(
          "span",
          {
            key: 0,
            class: normalizeClass(unref(bem).e("prepend"))
          },
          [
            renderSlot(_ctx.$slots, "prepend")
          ],
          2
          /* CLASS */
        )) : createCommentVNode("v-if", true),
        _ctx.loading ? (openBlock(), createElementBlock(
          "span",
          {
            key: 1,
            class: normalizeClass(unref(bem).e("loader"))
          },
          [
            createVNode(_sfc_main$1, { size: _ctx.size }, {
              default: withCtx(() => [
                createVNode(unref(Loading))
              ]),
              _: 1
              /* STABLE */
            }, 8, ["size"])
          ],
          2
          /* CLASS */
        )) : createCommentVNode("v-if", true),
        createElementVNode(
          "span",
          {
            class: normalizeClass(unref(bem).e("content"))
          },
          [
            createCommentVNode(" \u9ED8\u8BA4\u63D2\u69FD "),
            renderSlot(_ctx.$slots, "default")
          ],
          2
          /* CLASS */
        ),
        _ctx.$slots.append ? (openBlock(), createElementBlock(
          "span",
          {
            key: 2,
            class: normalizeClass(unref(bem).e("append"))
          },
          [
            renderSlot(_ctx.$slots, "append")
          ],
          2
          /* CLASS */
        )) : createCommentVNode("v-if", true)
      ], 46, _hoisted_1);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=button.vue2.mjs.map
