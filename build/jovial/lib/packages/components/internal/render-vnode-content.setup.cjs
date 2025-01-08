'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const vue = require('vue')

const JvRenderVNodeContent = vue.defineComponent({
  name: 'JvRenderVNodeContent',
  props: {
    render: {
      type: Function,
      default: undefined,
      required: false,
    },
  },
  setup(props, { slots }) {
    return () => {
      return slots.default ? slots.default() : props.render ? props.render() : null
    }
  },
})

exports.default = JvRenderVNodeContent
// # sourceMappingURL=render-vnode-content.setup.cjs.map
