import { createBlock, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, Fragment, normalizeClass, openBlock, ref, renderSlot, toDisplayString, unref, withCtx, withModifiers } from 'vue'
import { createNamespace } from '../../../utils/create.mjs'
import JvRenderVNodeContent from '../../internal/render-vnode-content.setup.mjs'
import _sfc_main$1 from '../../popper/src/popper.vue2.mjs'
import { tooltipEmits } from './tooltip.mjs'

const _hoisted_1 = { key: 0 }
const _hoisted_2 = { key: 0 }
const _sfc_main = /* @__PURE__ */ defineComponent({
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
  emits: tooltipEmits,
  setup(__props, { emit: __emit }) {
    const props = __props
    const bem = createNamespace('tooltip')
    const popperRef = ref()
    const referenceRef = ref()
    const visibleRef = ref(false)
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
      return openBlock(), createElementBlock(
        'div',
        {
          class: normalizeClass(unref(bem).b()),
        },
        [
          createElementVNode(
            'div',
            {
              ref_key: 'referenceRef',
              ref: referenceRef,
              class: normalizeClass(unref(bem).e('reference')),
              onClick: handleClickShow,
              onMouseenter: withModifiers(handleHoverShow, ['prevent']),
              onMouseleave: handleHide,
            },
            [
              _ctx.$slots.content ? (openBlock(), createElementBlock('div', _hoisted_1, [
                renderSlot(_ctx.$slots, 'content'),
              ])) : (openBlock(), createElementBlock(
                Fragment,
                { key: 1 },
                [
                  createCommentVNode(' <div v-else-if="$slots.activator">\n        <slot name="activator"></slot>\n      </div> '),
                  createElementVNode('div', null, [
                    renderSlot(_ctx.$slots, 'default'),
                  ]),
                ],
                2112,
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              )),
            ],
            34,
            /* CLASS, NEED_HYDRATION */
          ),
          createVNode(_sfc_main$1, {
            ref_key: 'popperRef',
            ref: popperRef,
            offset: 12,
            visible: visibleRef.value,
            reference: referenceRef.value,
            placement: _ctx.placement || 'bottom-end',
          }, {
            content: withCtx(() => [
              _ctx.content ? (openBlock(), createElementBlock(
                'div',
                _hoisted_2,
                toDisplayString(_ctx.content),
                1,
                /* TEXT */
              )) : _ctx.$slots.content
                ? (openBlock(), createBlock(unref(JvRenderVNodeContent), {
                    key: 1,
                    render: _ctx.$slots.content,
                  }, null, 8, ['render']))
                : (openBlock(), createBlock(unref(JvRenderVNodeContent), {
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

export { _sfc_main as default }
// # sourceMappingURL=tooltip.vue2.mjs.map
