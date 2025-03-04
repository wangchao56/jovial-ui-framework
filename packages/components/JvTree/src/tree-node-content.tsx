import { defineComponent, inject } from 'vue'
import { treeInjectKey, treeNodeContentProps } from './tree'

export default defineComponent({
  name: 'JvTreeNodeContent',
  props: treeNodeContentProps,
  setup(props) {
    const treeContext = inject(treeInjectKey)
    return () => {
      const { node } = props
      return treeContext?.slots.default
        ? treeContext?.slots.default({ node })
        : node.label
    }
  },
})
