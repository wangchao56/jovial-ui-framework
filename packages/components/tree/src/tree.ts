import { ExtractPropTypes, InjectionKey, PropType, SetupContext } from 'vue'

export type Key = string | number

export interface TreeOptions {
  key?: Key
  label?: Key
  children?: TreeOptions[]
  isLeaf?: boolean
  disabled?: boolean
  [key: string]: unknown
}

export interface TreeNode extends Required<TreeOptions> {
  level: number
  rawNode: TreeOptions
  children: TreeNode[]
  isLeaf: boolean
}

export const treePorps = {
  data: {
    type: Array as PropType<TreeOptions[]>,
    default: () => []
  },
  keyField: {
    type: String,
    default: 'key'
  },
  labelField: {
    type: String,
    default: 'label'
  },
  childrenField: {
    type: String,
    default: 'children'
  },
  //  默认展开
  defaultExpandedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },

  onLoad: {
    type: Function as PropType<(node: TreeOptions) => Promise<TreeOptions[]>>
  },
  //选中
  //    默认选中
  defaultSelectedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  selectedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  //是否可选 true
  selectable: {
    type: Boolean,
    default: true
  },
  //是否可拖拽
  draggable: {
    type: Boolean,
    default: false
  },
  //是否多选
  multiple: {
    type: Boolean,
    default: false
  }
} as const

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  },
  //是否可选 true
  selectable: {
    type: Boolean,
    default: true
  },
  //  是否展开
  expanded: {
    type: Boolean,
    default: false
  },
  loadingKeys: {
    type: Object as PropType<Set<Key>>,
    default: () => []
  },
  selectedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  }
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
} as const

export const treeNodeEmits = {
  toggle: (node: TreeNode) => true,
  select: (node: TreeNode) => true,
  dragStart: (node: TreeNode) => true,
  dragEnd: (node: TreeNode) => true,
  dragEnter: (node: TreeNode) => true,
  dragLeave: (node: TreeNode) => true,
  dragOver: (node: TreeNode) => true,
  drop: (node: TreeNode) => true
} as const

export const treeEmits = {
  'update:selectedKeys': (keys: Key[]) => keys
}

export const treeNodeContentProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  }
} as const
export type TreeNodeContentProps = ExtractPropTypes<typeof treeNodeContentProps>
export type TreeProps = Partial<ExtractPropTypes<typeof treePorps>>

export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>

export function createOptions(key: Key, label: Key, children: Key) {
  return {
    getKey(node) {
      return node[key] as string
    },
    getLabel(node) {
      return node[label] as string
    },
    getChildren(node) {
      return node[children] as TreeOptions[]
    }
  }
}

export interface TreeContext {
  slots: SetupContext['slots']
  // emit: SetupContext<typeof treeEmits>['emit']
}

export const treeInjectKey: InjectionKey<TreeContext> = Symbol('tree')
