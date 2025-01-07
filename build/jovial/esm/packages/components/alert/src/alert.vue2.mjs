import { defineComponent, ref, resolveComponent, openBlock, createBlock, Transition, withCtx, createElementBlock, normalizeClass, unref, createVNode, createCommentVNode, createElementVNode, renderSlot, createTextVNode, toDisplayString } from 'vue';
import { createNamespace } from '../../../utils/create.mjs';
import { alertProps, alertEmits } from './alert.mjs';
import button from '../../button/index.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "JvAlert" },
  __name: "alert",
  props: alertProps,
  emits: alertEmits,
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const bem = createNamespace("alert");
    const visible = ref(true);
    const handleClose = () => {
      visible.value = false;
      emit("close");
    };
    return (_ctx, _cache) => {
      const _component_JvIcon = resolveComponent("JvIcon");
      return openBlock(), createBlock(Transition, { name: "fade" }, {
        default: withCtx(() => [
          visible.value ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass([unref(bem).b(), unref(bem).m(_ctx.type), unref(bem).is("closable", _ctx.closable)])
            },
            [
              _ctx.showIcon ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 0,
                  class: normalizeClass(unref(bem).e("icon"))
                },
                [
                  createVNode(_component_JvIcon)
                ],
                2
                /* CLASS */
              )) : createCommentVNode("v-if", true),
              createElementVNode(
                "div",
                {
                  class: normalizeClass(unref(bem).e("header"))
                },
                [
                  renderSlot(_ctx.$slots, "title", {}, () => [
                    createTextVNode(
                      toDisplayString(_ctx.title),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              ),
              createElementVNode(
                "div",
                {
                  class: normalizeClass(unref(bem).e("content"))
                },
                [
                  renderSlot(_ctx.$slots, "default", {}, () => [
                    createTextVNode(
                      toDisplayString(_ctx.message),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              ),
              _ctx.closable ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 1,
                  class: normalizeClass(unref(bem).e("close"))
                },
                [
                  createVNode(unref(button), {
                    variant: "plain",
                    onClick: handleClose
                  }, {
                    default: withCtx(() => _cache[0] || (_cache[0] = [
                      createTextVNode(" \xD7 ")
                    ])),
                    _: 1
                    /* STABLE */
                  })
                ],
                2
                /* CLASS */
              )) : createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      });
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=alert.vue2.mjs.map
