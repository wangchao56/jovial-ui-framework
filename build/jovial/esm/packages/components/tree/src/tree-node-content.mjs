import { defineComponent, inject } from 'vue';
import { treeNodeContentProps, treeInjectKey } from './tree.mjs';

var JvTreeNodeContent = defineComponent({
  name: "JvTreeNodeContent",
  props: treeNodeContentProps,
  setup(props) {
    const treeContext = inject(treeInjectKey);
    return () => {
      const { node } = props;
      return (treeContext == null ? undefined : treeContext.slots.default) ? treeContext == null ? undefined : treeContext.slots.default({ node }) : node.label;
    };
  }
});

export { JvTreeNodeContent as default };
//# sourceMappingURL=tree-node-content.mjs.map
