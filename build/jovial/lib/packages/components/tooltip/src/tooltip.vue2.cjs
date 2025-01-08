'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const vue = require('vue')
const create = require('../../../utils/create.cjs')
const renderVnodeContent_setup = require('../../internal/render-vnode-content.setup.cjs')
const popper_vue_vue_type_script_setup_true_lang = require('../../popper/src/popper.vue2.cjs')
const tooltip = require('./tooltip.cjs')

const _hoisted_1 = { key: 0 }
const _hoisted_2 = { key: 0 }
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{ name: 'JvTooltip' },
  __name: 'tooltip',
  props: {
    activator: { type: null, required: false },
    content: { type: String, required: false, default: '' },
    placement: { type: null, required: false, default: 'bottom-end' },
    disabled: { type: Boolean, required: false },
    offset: { type: Number, required: false },
    trigger: { type: String, required: false, default: 'hover' },
    virtualTriggering: { type: Boolean, required: false },
    triggerKeys: { type: Array, required: false },
  },
  emits: tooltip.tooltipEmits,
  setup(__props, { emit: __emit }) {
    const props = __props
    const bem = create.createNamespace('tooltip')
    const popperRef = vue.ref()
    const referenceRef = vue.ref()
    const visibleRef = vue.ref(false)
    function handleClickShow() {
      let _a
      if (props.trigger === 'click') {
        visibleRef.value = !visibleRef.value
      }
      (_a = popperRef.value) == null ? undefined : _a.update()
    }
    function handleHoverShow() {
      let _a
      if (props.trigger === 'hover') {
        console.log('hover')
        visibleRef.value = true
      }
      (_a = popperRef.value) == null ? undefined : _a.update()
    }
    function handleHide() {
      let _a
      if (props.trigger === 'hover') {
        visibleRef.value = false
      }
      (_a = popperRef.value) == null ? undefined : _a.update()
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        'div',
        {
          class: vue.normalizeClass(vue.unref(bem).b()),
        },
        [
          vue.createElementVNode(
            'div',
            {
              ref_key: 'referenceRef',
              ref: referenceRef,
              class: vue.normalizeClass(vue.unref(bem).e('reference')),
              onClick: handleClickShow,
              onMouseenter: vue.withModifiers(handleHoverShow, ['prevent']),
              onMouseleave: handleHide,
            },
            [
              _ctx.$slots.content ? (vue.openBlock(), vue.createElementBlock('div', _hoisted_1, [
                vue.renderSlot(_ctx.$slots, 'content'),
              ])) : (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 1 },
                [
                  vue.createCommentVNode(' <div v-else-if="$slots.activator">\n        <slot name="activator"></slot>\n      </div> '),
                  vue.createElementVNode('div', null, [
                    vue.renderSlot(_ctx.$slots, 'default'),
                  ]),
                ],
                2112,
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              )),
            ],
            34,
            /* CLASS, NEED_HYDRATION */
          ),
          vue.createVNode(popper_vue_vue_type_script_setup_true_lang.default, {
            ref_key: 'popperRef',
            ref: popperRef,
            offset: 12,
            visible: visibleRef.value,
            reference: referenceRef.value,
            placement: _ctx.placement || 'bottom-end',
          }, {
            content: vue.withCtx(() => [
              _ctx.content ? (vue.openBlock(), vue.createElementBlock(
                'div',
                _hoisted_2,
                vue.toDisplayString(_ctx.content),
                1,
                /* TEXT */
              )) : _ctx.$slots.content
                ? (vue.openBlock(), vue.createBlock(vue.unref(renderVnodeContent_setup.default), {
                    key: 1,
                    render: _ctx.$slots.content,
                  }, null, 8, ['render']))
                : (vue.openBlock(), vue.createBlock(vue.unref(renderVnodeContent_setup.default), {
                    key: 2,
                    render: _ctx.$slots.default,
                  }, null, 8, ['render'])),
            ]),
            _: 1,
            /* STABLE */
          }, 8, ['visible', 'reference', 'placement']),
        ],
        2,
        /* CLASS */
      )
    }
  },
})

exports.default = _sfc_main
// # sourceMappingURL=tooltip.vue2.cjs.map
