import { ExtractPropTypes, PropType } from "vue";

type Key = string | number;

export interface TreeOptions {
  key?: Key;
  label?: Key;
  children?: TreeNode[];
  isLeaf: boolean;
  [key: string]: unknown;
}

export interface TreeNode extends Required<TreeOptions> {
  level: number;
  rawNode: TreeOptions;
}

export const treePorps = {
  data: {
    type: Array as PropType<TreeOptions[]>,
    default: () => [],
  },
  keyField: {
    type: String,
    default: "key",
  },
  labelField: {
    type: String,
    default: "label",
  },
  childrenField: {
    type: String,
    default: "children",
  },
  //  默认展开
  defaultExpandedKeys: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
  //    默认选中
  defaultSelectedKeys: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
} as const;

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true,
  },
  // //  是否选中
  // checked: {
  //   type: Boolean,
  //   default: false,
  // },
  // //  是否半选中
  // indeterminate: {
  //   type: Boolean,
  //   default: false,
  // },
  //  是否展开
  expanded: {
    type: Boolean,
    default: false,
  },
} as const;

export const treeNodeEmits = {
  toggle: (node: TreeNode) => true,
} as const;

export type TreeProps = Partial<ExtractPropTypes<typeof treePorps>>;

export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>;

export function createOptions(key: Key, label: Key, children: Key) {
  return {
    getKey(node) {
      return node[key] as string;
    },
    getLabel(node) {
      return node[label] as string;
    },
    getChildren(node) {
      return node[children] as TreeOptions[];
    },
  };
}
