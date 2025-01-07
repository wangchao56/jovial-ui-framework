'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var create = require('../../../utils/create.cjs');
var alert = require('./alert.cjs');
var index = require('../../button/index.cjs');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{ name: "JvAlert" },
  __name: "alert",
  props: alert.alertProps,
  emits: alert.alertEmits,
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const bem = create.createNamespace("alert");
    const visible = vue.ref(true);
    const handleClose = () => {
      visible.value = false;
      emit("close");
    };
    return (_ctx, _cache) => {
      const _component_JvIcon = vue.resolveComponent("JvIcon");
      return vue.openBlock(), vue.createBlock(vue.Transition, { name: "fade" }, {
        default: vue.withCtx(() => [
          visible.value ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass([vue.unref(bem).b(), vue.unref(bem).m(_ctx.type), vue.unref(bem).is("closable", _ctx.closable)])
            },
            [
              _ctx.showIcon ? (vue.openBlock(), vue.createElementBlock(
                "div",
                {
                  key: 0,
                  class: vue.normalizeClass(vue.unref(bem).e("icon"))
                },
                [
                  vue.createVNode(_component_JvIcon)
                ],
                2
                /* CLASS */
              )) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(vue.unref(bem).e("header"))
                },
                [
                  vue.renderSlot(_ctx.$slots, "title", {}, () => [
                    vue.createTextVNode(
                      vue.toDisplayString(_ctx.title),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(vue.unref(bem).e("content"))
                },
                [
                  vue.renderSlot(_ctx.$slots, "default", {}, () => [
                    vue.createTextVNode(
                      vue.toDisplayString(_ctx.message),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              ),
              _ctx.closable ? (vue.openBlock(), vue.createElementBlock(
                "div",
                {
                  key: 1,
                  class: vue.normalizeClass(vue.unref(bem).e("close"))
                },
                [
                  vue.createVNode(vue.unref(index.default), {
                    variant: "plain",
                    onClick: handleClose
                  }, {
                    default: vue.withCtx(() => _cache[0] || (_cache[0] = [
                      vue.createTextVNode(" \xD7 ")
                    ])),
                    _: 1
                    /* STABLE */
                  })
                ],
                2
                /* CLASS */
              )) : vue.createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      });
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=alert.vue2.cjs.map
