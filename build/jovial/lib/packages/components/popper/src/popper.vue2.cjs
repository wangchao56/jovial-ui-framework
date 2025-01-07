'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var create = require('../../../utils/create.cjs');
var popper = require('./popper.cjs');
var floatingUi_vue = require('../../../../node_modules/.pnpm/@floating-ui_vue@1.1.5_vue@3.5.13_typescript@5.7.2_/node_modules/@floating-ui/vue/dist/floating-ui.vue.cjs');
var floatingUi_dom = require('../../../../node_modules/.pnpm/@floating-ui_dom@1.6.12/node_modules/@floating-ui/dom/dist/floating-ui.dom.cjs');

const prop = "activator";
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{ name: "JvPoppervue" },
  __name: "popper",
  props: popper.popperProps,
  emits: ["update:visible", "someEvent"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const bem = create.createNamespace("popper");
    const props = __props;
    const emit = __emit;
    const slots = vue.useSlots();
    const reference = vue.ref(null);
    const floatingRef = vue.ref(null);
    const floatingArrow = vue.ref(null);
    vue.ref(null);
    vue.watchEffect(() => {
      if (slots.activator) {
        vue.nextTick(() => {
          reference.value = document.querySelector(`[prop=${prop}]`);
        });
      } else {
        reference.value = props.reference;
      }
    });
    const showPopper = vue.computed(() => {
      console.log("showPopper", props.visible);
      return props.visible;
    });
    const middlewareRef = vue.computed(() => {
      const temp = [];
      if (props.offset) {
        temp.push(floatingUi_dom.offset(props.offset));
      }
      if (props.arrow) {
        temp.push(floatingUi_vue.arrow({ element: floatingArrow }));
      }
      if (props.flip) {
        temp.push(floatingUi_dom.flip());
      }
      if (props.shift) {
        temp.push(floatingUi_dom.shift());
      }
      return temp;
    });
    const { floatingStyles, middlewareData, ...args } = floatingUi_vue.useFloating(
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
      return vue.openBlock(), vue.createBlock(vue.Transition, { name: "fade" }, {
        default: vue.withCtx(() => {
          var _a, _b;
          return [
            showPopper.value ? (vue.openBlock(), vue.createElementBlock(
              "div",
              {
                key: 0,
                ref_key: "floatingRef",
                ref: floatingRef,
                class: vue.normalizeClass([vue.unref(bem).b()]),
                style: vue.normalizeStyle(vue.unref(floatingStyles))
              },
              [
                props.arrow ? (vue.openBlock(), vue.createElementBlock(
                  "div",
                  {
                    key: 0,
                    ref_key: "floatingArrow",
                    ref: floatingArrow,
                    class: vue.normalizeClass([vue.unref(bem).e("arrow")]),
                    style: vue.normalizeStyle({
                      position: "absolute",
                      left: ((_a = vue.unref(middlewareData).arrow) == null ? undefined : _a.x) != null ? `${vue.unref(middlewareData).arrow.x}px` : "",
                      top: ((_b = vue.unref(middlewareData).arrow) == null ? undefined : _b.y) != null ? `${vue.unref(middlewareData).arrow.y}px` : ""
                    })
                  },
                  null,
                  6
                  /* CLASS, STYLE */
                )) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode(
                  "div",
                  {
                    class: vue.normalizeClass(vue.unref(bem).e("content"))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "content")
                  ],
                  2
                  /* CLASS */
                )
              ],
              6
              /* CLASS, STYLE */
            )) : vue.createCommentVNode("v-if", true)
          ];
        }),
        _: 3
        /* FORWARDED */
      });
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=popper.vue2.cjs.map
