'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const vue = require('vue')
const index = require('../../../../typings/index.cjs')
const common = require('../../../utils/common.cjs')
const create = require('../../../utils/create.cjs')
const icon = require('./icon.cjs')

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{ name: 'JvIcon' },
  __name: 'icon',
  props: icon.iconProps,
  setup(__props) {
    const bem = create.createNamespace('icon')
    const props = __props
    const iconClass = vue.computed(() => {
      const baseClass = bem.b()
      const sizeClass = common.isString(props.size) && props.size.toUpperCase() in index.SizeOptions ? bem.m(props.size) : ''
      return [baseClass, sizeClass].filter(Boolean)
    })
    const iconStyle = vue.computed(() => {
      const result = {}
      if (props.color) {
        result.color = props.color
      }
      if (props.size || common.isNumberExcludeNaN(props.size)) {
        result.fontSize = `${props.size}px`
        result.lineHeight = `${props.size}px`
        result.width = `${props.size}px`
        result.maxHeight = `${props.size}px`
      }
      return result
    })
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        'i',
        {
          class: vue.normalizeClass(iconClass.value),
          style: vue.normalizeStyle(iconStyle.value),
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
// # sourceMappingURL=icon.vue2.cjs.map
