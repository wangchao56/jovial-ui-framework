<template>
  <div :class="bem.b()">
    <jv-tree-node
      v-for="node in flattenTree"
      :node="node"
      :key="node.key"
      :label="node.label"
      :is-leaf="node.isLeaf"
      :level="node.level"
      :raw-node="node.rawNode"
      :expanded="isExpanded(node)"
      @toggle="toggleNode"
    >
      <template #suffix>
        <div>后缀</div>
      </template>
    </jv-tree-node>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { treePorps, createOptions } from "./tree";
import type { TreeNode, TreeOptions } from "./tree";
import { createNamespace } from "@jovial/utils/index";
import JvTreeNode from "./treeNode.vue";
const props = defineProps(treePorps);
defineOptions({ name: "jv-tree" });
const bem = createNamespace("tree");

const tree = ref<TreeNode[]>([]);

const treeOption = createOptions(
  props.keyField,
  props.labelField,
  props.childrenField
);

function createTree(data: TreeOptions[]): TreeNode[] {
  function traversalTree(data: TreeOptions[], parent: TreeNode | null = null) {
    return data.map((item) => {
      const children = treeOption.getChildren(item) || [];
      const node: TreeNode = {
        key: treeOption.getKey(item),
        label: treeOption.getLabel(item),
        rawNode: item,
        children: [],
        level: parent ? parent.level + 1 : 0,
        //判断 是否是叶子节点
        isLeaf: item.isLeaf ?? children.length === 0,
      };

      if (children.length > 0) {
        node.children = traversalTree(children, node);
      }

      return node;
    });
  }
  const result = traversalTree(data);
  return result;
}
watch(
  () => props.data,
  (newVal) => {
    tree.value = createTree(newVal);
    console.log(tree.value);
  },
  { immediate: true }
);
//默认展开
const expandedKeysSet = ref(new Set(props.defaultExpandedKeys));

const flattenTree = computed(() => {
  const expandedKeys = expandedKeysSet.value;
  let flattedNodes: TreeNode[] = []; //最终拍平的节点
  const nodes = tree.value || []; //格式话后的数据
  let stack: TreeNode[] = [];
  //   //深度优先遍历
  //   function dfs(nodes: TreeNode[], parent: TreeNode | null = null) {
  //     nodes.forEach((node) => {
  //       //判断是否展开
  //       const expanded = expandedKeys.has(node.key);
  //       //添加到拍平的数组中
  //       flattedNodes.push({
  //         ...node,
  //         expanded,
  //         parent,
  //       });

  //       //递归子节点
  //       if (expanded && node.children) {
  //         dfs(node.children, node);
  //       }
  //     });
  //   }
  //   //遍历花费的时间
  //   console.time("dfs");
  //   dfs(nodes);
  //   console.timeEnd("dfs");
  console.time("dfs");

  for (let i = nodes.length - 1; i >= 0; --i) {
    stack.push(nodes[i]);
  }
  while (stack.length > 0) {
    const node = stack.pop();
    if (!node) continue;
    const expanded = expandedKeys.has(node.key);
    flattedNodes.push({
      ...node,
    });
    if (expanded && node.children) {
      for (let i = node.children.length - 1; i >= 0; --i) {
        stack.push(node.children[i]);
      }
    }
  }
  console.timeEnd("dfs");
  return flattedNodes;
});

function isExpanded(node: TreeNode) {
  return expandedKeysSet.value.has(node.key);
}

//展开节点
function expandNode(node: TreeNode) {
  expandedKeysSet.value.add(node.key);
}
//折叠节点
function collapseNode(node: TreeNode) {
  expandedKeysSet.value.delete(node.key);
}

function toggleNode(node: TreeNode) {
  if (isExpanded(node)) {
    collapseNode(node);
  } else {
    expandNode(node);
  }
}

console.log(flattenTree);
</script>
