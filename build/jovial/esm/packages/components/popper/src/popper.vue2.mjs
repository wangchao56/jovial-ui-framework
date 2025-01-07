import { defineComponent, useSlots, ref, watchEffect, nextTick, computed, openBlock, createBlock, Transition, withCtx, createElementBlock, normalizeClass, unref, normalizeStyle, createCommentVNode, createElementVNode, renderSlot } from 'vue';
import { createNamespace } from '../../../utils/create.mjs';
import { popperProps } from './popper.mjs';
import { arrow, useFloating } from '../../../../node_modules/.pnpm/@floating-ui_vue@1.1.5_vue@3.5.13_typescript@5.7.2_/node_modules/@floating-ui/vue/dist/floating-ui.vue.mjs';
import { offset, flip, shift } from '../../../../node_modules/.pnpm/@floating-ui_dom@1.6.12/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs';

const prop = "activator";
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "JvPoppervue" },
  __name: "popper",
  props: popperProps,
  emits: ["update:visible", "someEvent"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const bem = createNamespace("popper");
    const props = __props;
    const emit = __emit;
    const slots = useSlots();
    const reference = ref(null);
    const floatingRef = ref(null);
    const floatingArrow = ref(null);
    ref(null);
    watchEffect(() => {
      if (slots.activator) {
        nextTick(() => {
          reference.value = document.querySelector(`[prop=${prop}]`);
        });
      } else {
        reference.value = props.reference;
      }
    });
    const showPopper = computed(() => {
      console.log("showPopper", props.visible);
      return props.visible;
    });
    const middlewareRef = computed(() => {
      const temp = [];
      if (props.offset) {
        temp.push(offset(props.offset));
      }
      if (props.arrow) {
        temp.push(arrow({ element: floatingArrow }));
      }
      if (props.flip) {
        temp.push(flip());
      }
      if (props.shift) {
        temp.push(shift());
      }
      return temp;
    });
    const { floatingStyles, middlewareData, ...args } = useFloating(
      reference,
      floatingRef,
      {
        placement: props.placement,
        middleware: middlewareRef,
        open: showPopper
        // whileElementsMounted(referenceEl, floatingEl, update) {
        //   const cleanup = autoUpdate(referenceEl, floatingEl, update, {
        //     layoutShift: false
        //   })
        //   return cleanup
        // }
      }
    );
    __expose({
      close: () => {
        emit("update:visible", false);
      },
      floatingStyles,
      middlewareData,
      ...args
      // 其他实例方法...
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, { name: "fade" }, {
        default: withCtx(() => {
          var _a, _b;
          return [
            showPopper.value ? (openBlock(), createElementBlock(
              "div",
              {
                key: 0,
                ref_key: "floatingRef",
                ref: floatingRef,
                class: normalizeClass([unref(bem).b()]),
                style: normalizeStyle(unref(floatingStyles))
              },
              [
                props.arrow ? (openBlock(), createElementBlock(
                  "div",
                  {
                    key: 0,
                    ref_key: "floatingArrow",
                    ref: floatingArrow,
                    class: normalizeClass([unref(bem).e("arrow")]),
                    style: normalizeStyle({
                      position: "absolute",
                      left: ((_a = unref(middlewareData).arrow) == null ? undefined : _a.x) != null ? `${unref(middlewareData).arrow.x}px` : "",
                      top: ((_b = unref(middlewareData).arrow) == null ? undefined : _b.y) != null ? `${unref(middlewareData).arrow.y}px` : ""
                    })
                  },
                  null,
                  6
                  /* CLASS, STYLE */
                )) : createCommentVNode("v-if", true),
                createElementVNode(
                  "div",
                  {
                    class: normalizeClass(unref(bem).e("content"))
                  },
                  [
                    renderSlot(_ctx.$slots, "content")
                  ],
                  2
                  /* CLASS */
                )
              ],
              6
              /* CLASS, STYLE */
            )) : createCommentVNode("v-if", true)
          ];
        }),
        _: 3
        /* FORWARDED */
      });
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=popper.vue2.mjs.map
