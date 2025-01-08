'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const vue = require('vue')
const create = require('../../../utils/create.cjs')
const button = require('./button.cjs')
require('../../internal-icon/close-thick.cjs')
require('../../internal-icon/IconEyeOff.cjs')
require('../../internal-icon/IconEyeOn.cjs')
const Loading = require('../../internal-icon/Loading.cjs')
require('../../internal-icon/Switcher.cjs')
const icon_vue_vue_type_script_setup_true_lang = require('../../icon/src/icon.vue2.cjs')

const _hoisted_1 = ['disabled', 'type', 'autofocus']
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: 'JvButton',
    inheritAttrs: true,
  },
  __name: 'button',
  props: button.buttonProps,
  emits: ['click', 'mousedown', 'keydown'],
  setup(__props, { emit: __emit }) {
    const props = __props
    const emit = __emit
    const bem = create.createNamespace('button')
    function emitClick(e) {
      emit('click', e)
    }
    function emitMouseDown(e) {
      emit('mousedown', e)
    }
    const buttonStyle = vue.computed(() => {
      const result = {}
      if (props.color) {
        result.color = props.color
      }
      if (props.bgColor) {
        result['background-color'] = props.bgColor
      }
      return result
    })
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock('button', {
        class: vue.normalizeClass([
          vue.unref(bem).b(),
          vue.unref(bem).m(_ctx.type),
          vue.unref(bem).m(_ctx.size),
          vue.unref(bem).m(_ctx.variant),
          vue.unref(bem).is('dashed', _ctx.dashed),
          vue.unref(bem).is('rounded', _ctx.rounded),
          vue.unref(bem).is('loading', _ctx.loading),
          vue.unref(bem).is('disabled', _ctx.disabled),
          vue.unref(bem).is('block', _ctx.block),
          vue.unref(bem).is('stacked', _ctx.stacked),
        ]),
        disabled: _ctx.loading || _ctx.disabled,
        style: vue.normalizeStyle(buttonStyle.value),
        type: _ctx.nativeType,
        autofocus: _ctx.autofocus,
        onClick: emitClick,
        onMousedown: emitMouseDown,
      }, [
        _ctx.$slots.prepend ? (vue.openBlock(), vue.createElementBlock(
          'span',
          {
            key: 0,
            class: vue.normalizeClass(vue.unref(bem).e('prepend')),
          },
          [
            vue.renderSlot(_ctx.$slots, 'prepend'),
          ],
          2,
          /* CLASS */
        )) : vue.createCommentVNode('v-if', true),
        _ctx.loading ? (vue.openBlock(), vue.createElementBlock(
          'span',
          {
            key: 1,
            class: vue.normalizeClass(vue.unref(bem).e('loader')),
          },
          [
            vue.createVNode(icon_vue_vue_type_script_setup_true_lang.default, { size: _ctx.size }, {
              default: vue.withCtx(() => [
                vue.createVNode(vue.unref(Loading.default)),
              ]),
              _: 1,
              /* STABLE */
            }, 8, ['size']),
          ],
          2,
          /* CLASS */
        )) : vue.createCommentVNode('v-if', true),
        vue.createElementVNode(
          'span',
          {
            class: vue.normalizeClass(vue.unref(bem).e('content')),
          },
          [
            vue.createCommentVNode(' \u9ED8\u8BA4\u63D2\u69FD '),
            vue.renderSlot(_ctx.$slots, 'default'),
          ],
          2,
          /* CLASS */
        ),
        _ctx.$slots.append ? (vue.openBlock(), vue.createElementBlock(
          'span',
          {
            key: 2,
            class: vue.normalizeClass(vue.unref(bem).e('append')),
          },
          [
            vue.renderSlot(_ctx.$slots, 'append'),
          ],
          2,
          /* CLASS */
        )) : vue.createCommentVNode('v-if', true),
      ], 46, _hoisted_1)
    }
  },
})

exports.default = _sfc_main
// # sourceMappingURL=button.vue2.cjs.map
