'use strict';

const treePorps = {
  data: {
    type: Array,
    default: () => []
  },
  keyField: {
    type: String,
    default: "key"
  },
  labelField: {
    type: String,
    default: "label"
  },
  childrenField: {
    type: String,
    default: "children"
  },
  //  默认展开
  defaultExpandedKeys: {
    type: Array,
    default: () => []
  },
  onLoad: {
    type: Function
  },
  //选中
  //    默认选中节点的 key 数组
  defaultSelectedKeys: {
    type: Array,
    default: () => []
  },
  selectedKeys: {
    type: Array,
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
  },
  virtualScroll: {
    type: Boolean,
    default: false
  },
  /** 是否显示复选框 */
  showCheckbox: {
    type: Boolean,
    default: false
  },
  //当前选中节点的 key 数组
  defaultCheckedKeys: {
    type: Array,
    default: () => []
  }
};
const treeNodeProps = {
  node: {
    type: Object,
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
    type: Object,
    default: () => []
  },
  selectedKeys: {
    type: Array,
    default: () => []
  },
  /** 是否显示复选框 */
  showCheckbox: {
    type: Boolean,
    default: false
  },
  //  是否选中
  checked: {
    type: Boolean,
    default: false
  },
  //  是否半选中
  indeterminate: {
    type: Boolean,
    default: false
  },
  checkedKeys: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  }
};
const treeNodeEmits = {
  toggle: (node) => true,
  select: (node) => true,
  check: (node, checked) => typeof checked === "boolean",
  dragStart: (node) => true,
  dragEnd: (node) => true,
  dragEnter: (node) => true,
  dragLeave: (node) => true,
  dragOver: (node) => true,
  drop: (node) => true
};
const treeEmits = {
  "update:selectedKeys": (keys) => keys
};
const treeNodeContentProps = {
  node: {
    type: Object,
    required: true
  }
};
function createOptions(key, label, children) {
  return {
    getKey(node) {
      return node[key];
    },
    getLabel(node) {
      return node[label];
    },
    getChildren(node) {
      return node[children];
    }
  };
}
const treeInjectKey = Symbol("tree");

exports.createOptions = createOptions;
exports.treeEmits = treeEmits;
exports.treeInjectKey = treeInjectKey;
exports.treeNodeContentProps = treeNodeContentProps;
exports.treeNodeEmits = treeNodeEmits;
exports.treeNodeProps = treeNodeProps;
exports.treePorps = treePorps;
//# sourceMappingURL=tree.cjs.map
