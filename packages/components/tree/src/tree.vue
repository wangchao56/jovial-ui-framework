<template>
  <div :class="bem.b()">
    <jv-virtual-scroll
      v-if="props.virtualScroll"
      :items="flattenTree"
      :remain="8"
      :size="35"
    >
      <template #default="{ node: _node }">
        <jv-tree-node
          :node="_node"
          :key="_node.label"
          :label="_node.label"
          :is-leaf="_node.isLeaf"
          :level="_node.level"
          :raw-node="_node.rawNode"
          :expanded="isExpanded(_node)"
          :loading-keys="loadingKeysRef"
          :selected-keys="selectedKeysRef"
          @toggle="toggleNode"
          @select="selectNode"
        >
        </jv-tree-node>
      </template>
    </jv-virtual-scroll>
    <template v-else>
      <jv-tree-node
        v-for="node in flattenTree"
        :node="node"
        :key="node.key"
        :label="node.label"
        :is-leaf="node.isLeaf"
        :level="node.level"
        :raw-node="node.rawNode"
        :expanded="isExpanded(node)"
        :loading-keys="loadingKeysRef"
        :selected-keys="selectedKeysRef"
        @toggle="toggleNode"
        @select="selectNode"
      >
      </jv-tree-node>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, unref, useSlots, watch } from 'vue'
import { treePorps, createOptions, treeEmits, treeInjectKey } from './tree'
import type { Key, TreeNode, TreeOptions } from './tree'
import { createNamespace } from '@jovial/utils/index'
import JvTreeNode from './treeNode.vue'
import JvVirtualScroll from '../../virtual-scroll/index'

const props = defineProps(treePorps)
const emit = defineEmits(treeEmits)
defineOptions({ name: 'jv-tree' })
const bem = createNamespace('tree')

//传递依赖
provide(treeInjectKey, { slots: useSlots() })

const tree = ref<TreeNode[]>([])

const treeOption = createOptions(
  props.keyField,
  props.labelField,
  props.childrenField
)

function createTree(
  data: TreeOptions[],
  parent: TreeNode | null = null
): TreeNode[] {
  function traversalTree(data: TreeOptions[], parent: TreeNode | null = null) {
    return data.map((item) => {
      const children = treeOption.getChildren(item) || []
      const node: TreeNode = {
        key: treeOption.getKey(item),
        label: treeOption.getLabel(item),
        rawNode: item,
        children: [],
        level: parent ? parent.level + 1 : 0,
        //判断 是否是叶子节点
        isLeaf: item.isLeaf ?? children.length === 0,
        disabled: !!item.disabled
      }

      if (children.length > 0) {
        node.children = traversalTree(children, node)
      }

      return node
    })
  }
  const result = traversalTree(data, parent)
  return result
}
watch(
  () => props.data,
  (newVal) => {
    tree.value = createTree(newVal)
  },
  { immediate: true }
)
//默认展开
const expandedKeysSet = ref(new Set(props.defaultExpandedKeys))

const flattenTree = computed(() => {
  const expandedKeys = expandedKeysSet.value
  let flattedNodes: TreeNode[] = [] //最终拍平的节点
  const nodes = tree.value || [] //格式话后的数据
  let stack: TreeNode[] = []
  //深度优先遍历
  console.time('dfs')

  for (let i = nodes.length - 1; i >= 0; --i) {
    stack.push(nodes[i])
  }
  while (stack.length > 0) {
    const node = stack.pop()
    if (!node) continue
    const expanded = expandedKeys.has(node.key)
    flattedNodes.push({
      ...node
    })
    if (expanded && node.children) {
      for (let i = node.children.length - 1; i >= 0; --i) {
        stack.push(node.children[i])
      }
    }
  }
  console.timeEnd('dfs')
  return flattedNodes
})

function isExpanded(node: TreeNode) {
  return expandedKeysSet.value.has(node.key)
}

const loadingKeysRef = ref<Set<Key>>(new Set())

function triggerLoading(node: TreeNode) {
  if (!node.children.length && !node.isLeaf) {
    if (!unref(loadingKeysRef).has(node.key)) {
      loadingKeysRef.value.add(node.key)
      if (props.onLoad) {
        props.onLoad(node.rawNode).then((_children) => {
          node.rawNode.children = _children

          node.children = createTree(_children, node)

          loadingKeysRef.value.delete(node.key)
        })
      }
    }
  }
}

//展开节点
function expandNode(node: TreeNode) {
  expandedKeysSet.value.add(node.key)
  //实现对应的异步加载数据

  triggerLoading(node)
}
//折叠节点
function collapseNode(node: TreeNode) {
  expandedKeysSet.value.delete(node.key)
}
/**
 * 切换节点的展开或折叠状态
 *
 * @param node 节点对象，类型为 TreeNode
 */
function toggleNode(node: TreeNode) {
  if (
    unref(expandedKeysSet).has(node.key) &&
    !unref(loadingKeysRef).has(node.key)
  )
    collapseNode(node)
  else expandNode(node)
}

//实现选中节点
const selectedKeysRef = ref<Key[]>([])

watch(
  () => props.selectedKeys,
  (newVal) => {
    if (newVal) selectedKeysRef.value = newVal
  },
  { immediate: true }
)

function selectNode(node: TreeNode) {
  console.log('selectNode', node, props.selectable)

  // 如果设置了不可选择属性，则直接返回
  if (!props.selectable) return

  // 将 selectedKeysRef 的值转换为一个数组
  let selectedKeys = Array.from(selectedKeysRef.value)

  // 如果设置了多选属性
  if (props.multiple) {
    // 查找节点键在 selectedKeys 中的索引
    const index = selectedKeys.indexOf(node.key)
    // 如果节点键存在于 selectedKeys 中，则移除该键
    // 否则，将节点键添加到 selectedKeys 中
    index > -1 ? selectedKeys.splice(index, 1) : selectedKeys.push(node.key)
  } else {
    // 如果节点键存在于 selectedKeys 中，则清空 selectedKeys
    if (selectedKeys.includes(node.key)) {
      selectedKeys = []
    } else {
      // 否则，将节点键作为唯一元素放入 selectedKeys 中
      selectedKeys = [node.key]
    }
  }

  // 触发 update:selectedKeys 事件，传递更新后的 selectedKeys
  emit('update:selectedKeys', selectedKeys)
}
</script>
