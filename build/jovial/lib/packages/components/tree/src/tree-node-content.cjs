'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const vue = require('vue')
const tree = require('./tree.cjs')

const JvTreeNodeContent = vue.defineComponent({
  name: 'JvTreeNodeContent',
  props: tree.treeNodeContentProps,
  setup(props) {
    const treeContext = vue.inject(tree.treeInjectKey)
    return () => {
      const { node } = props
      return (treeContext == null ? undefined : treeContext.slots.default) ? treeContext == null ? undefined : treeContext.slots.default({ node }) : node.label
    }
  },
})

exports.default = JvTreeNodeContent
// # sourceMappingURL=tree-node-content.cjs.map
