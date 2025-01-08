'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const vue = require('vue')
const common = require('../../../utils/common.cjs')
const create = require('../../../utils/create.cjs')
const space = require('./space.cjs')

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{ name: 'JvSpace' },
  __name: 'space',
  props: space.spaceProps,
  setup(__props) {
    const props = __props
    const bem = create.createNamespace('space')
    const spaceStyle = vue.computed(() => {
      if (common.isNumber(props.size)) {
        return {
          '--space-size': `${props.size}px`,
        }
      }
      else if (common.isArray(props.size)) {
        return {
          '--space-size': props.size[0] ? `${props.size[0]}px` : 0,
          '--space-vertical-size': props.size[1] ? `${props.size[1]}px` : 0,
        }
      }
      switch (props.size) {
        case 'small':
          return { '--space-size': '8px' }
        case 'large':
          return { '--space-size': '24px' }
        case 'medium':
        default:
          return { '--space-size': '16px' }
      }
    })
    return (_ctx, _cache) => {
      let _a
      return vue.openBlock(), vue.createElementBlock(
        'div',
        {
          class: vue.normalizeClass([
            vue.unref(bem).b(),
            vue.unref(bem).m(`align-${_ctx.align}`),
            vue.unref(bem).m(`justify-${_ctx.justify}`),
            vue.unref(bem).m((_a = _ctx.direction) != null ? _a : 'horizontal'),
            vue.unref(bem).is('wrap', _ctx.wrap),
            vue.unref(bem).is('inline', _ctx.inline),
            // 自定义类
          ]),
          style: vue.normalizeStyle(spaceStyle.value),
        },
        [
          vue.renderSlot(_ctx.$slots, 'default'),
        ],
        6,
        /* CLASS, STYLE */
      )
    }
  },
})

exports.default = _sfc_main
// # sourceMappingURL=space.vue2.cjs.map
