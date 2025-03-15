<script setup lang="ts">
import type { Key, TreeNode, TreeOptions } from './tree'
import JvVirtualScroll from '@components/JvVirtualScroll'
import { createNamespace } from '@jienix/utils'
import { computed, onMounted, provide, ref, unref, useSlots, watch } from 'vue'
import JvTreeNode from './JvTreeNode.vue'
import { createOptions, treeEmits, treeInjectKey, treePorps } from './tree'

defineOptions({ name: 'JvTree', inheritAttrs: false })
const props = defineProps(treePorps)
const emit = defineEmits(treeEmits)
const bem = createNamespace('tree')

// 传递依赖
provide(treeInjectKey, { slots: useSlots() })

const tree = ref<TreeNode[]>([])

const treeOption = createOptions(
  props.keyField,
  props.labelField,
  props.childrenField,
)

function createTree(
  data: TreeOptions[],
  parent: TreeNode | null = null,
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
        // 判断 是否是叶子节点
        isLeaf: item.isLeaf ?? children.length === 0,
        disabled: !!item.disabled,
        parentKey: parent?.key,
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
  { immediate: true },
)
// 默认展开
const expandedKeysSet = ref(new Set(props.defaultExpandedKeys))

const flattenTree = computed(() => {
  const expandedKeys = expandedKeysSet.value
  const flattedNodes: TreeNode[] = [] // 最终拍平的节点
  const nodes = tree.value || [] // 格式话后的数据
  const stack: TreeNode[] = []
  // 深度优先遍历
  // console.time('dfs')
  for (let i = nodes.length - 1; i >= 0; --i) {
    stack.push(nodes[i])
  }
  while (stack.length > 0) {
    const node = stack.pop()
    if (!node)
      continue
    const expanded = expandedKeys.has(node.key)
    flattedNodes.push({
      ...node,
    })
    if (expanded && node.children) {
      for (let i = node.children.length - 1; i >= 0; --i) {
        stack.push(node.children[i])
      }
    }
  }

  return flattedNodes
})

function isExpanded(node: TreeNode) {
  return expandedKeysSet.value.has(node.key)
}

const checkedKeysSetRef = ref(new Set(props.defaultCheckedKeys))

function isChecked(node: TreeNode) {
  // return props.checkedKeys?.includes(node.key)
  return checkedKeysSetRef.value.has(node.key)
}

const indeterminateRefs = ref<Set<Key>>(new Set())

function isIndeterminate(node: TreeNode) {
  return indeterminateRefs.value.has(node.key)
}

function isDisabled(node: TreeNode) {
  return !!node.disabled
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

// 展开节点
function expandNode(node: TreeNode) {
  expandedKeysSet.value.add(node.key)
  // 实现对应的异步加载数据

  triggerLoading(node)
}
// 折叠节点
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
    unref(expandedKeysSet).has(node.key)
    && !unref(loadingKeysRef).has(node.key)
  ) {
    collapseNode(node)
  }
  else {
    expandNode(node)
  }
}

// 实现选中节点
const selectedKeysRef = ref<Key[]>([])

watch(
  () => props.selectedKeys,
  (newVal) => {
    if (newVal)
      selectedKeysRef.value = newVal
  },
  { immediate: true },
)

function selectNode(node: TreeNode) {
  // console.log('selectNode', node, props.selectable)

  // 如果设置了不可选择属性，则直接返回
  if (!props.selectable)
    return

  // 将 selectedKeysRef 的值转换为一个数组
  let selectedKeys = Array.from(selectedKeysRef.value)

  // 如果设置了多选属性
  if (props.multiple) {
    // 查找节点键在 selectedKeys 中的索引
    const index = selectedKeys.indexOf(node.key)
    // 如果节点键存在于 selectedKeys 中，则移除该键
    // 否则，将节点键添加到 selectedKeys 中
    index > -1 ? selectedKeys.splice(index, 1) : selectedKeys.push(node.key)
  }
  else {
    // 如果节点键存在于 selectedKeys 中，则清空 selectedKeys
    if (selectedKeys.includes(node.key)) {
      selectedKeys = []
    }
    else {
      // 否则，将节点键作为唯一元素放入 selectedKeys 中
      selectedKeys = [node.key]
    }
  }

  // 触发 update:selectedKeys 事件，传递更新后的 selectedKeys
  emit('update:selectedKeys', selectedKeys)
}

// 自上而下的更新选中状态
function toggleCheckKeys(node: TreeNode, checked: boolean) {
  const checkedKeys = checkedKeysSetRef.value
  if (checked) {
    // 添加节点到选中状态
    checkedKeys.add(node.key)
    indeterminateRefs.value.delete(node.key)
  }
  else {
    // 从选中状态中移除节点
    checkedKeys.delete(node.key)
  }

  const children = node.children
  if (children) {
    // 遍历子节点，根据父节点的选中状态更新它们的选中状态
    for (const child of children) {
      if (!child.disabled) {
        toggleCheckKeys(child, checked)
      }
    }
  }
}

function findNode(key: Key) {
  return flattenTree.value.find(item => item.key === key)
}

function updateCheckedKeys(node: TreeNode) {
  // 检查节点是否有父节点
  if (node.parentKey) {
    // 找到父节点
    const parentNode = findNode(node.parentKey)

    if (parentNode) {
      let allChecked = true // 默认状态：所有子节点都被选中
      let hasChecked = false // 用于跟踪是否有任意子节点被选中

      const nodes = parentNode.children // 获取父节点的所有子节点
      for (const childNode of nodes) {
        // 检查子节点是否被选中
        if (checkedKeysSetRef.value.has(childNode.key)) {
          hasChecked = true // 如果子节点被选中, 设置 hasChecked 为 true
        }
        else if (indeterminateRefs.value.has(childNode.key)) {
          allChecked = false // 如果子节点为不确定状态, 设置 allChecked 为 false
          hasChecked = true // 同时有被选中的子节点
        }
        else {
          allChecked = false // 如果子节点未被选中, 设置 allChecked 为 false
        }
      }

      // 根据子节点的状态更新父节点的状态
      if (allChecked) {
        checkedKeysSetRef.value.add(parentNode.key) // 如果所有子节点都被选中, 父节点也标记为选中
        indeterminateRefs.value.delete(parentNode.key) // 移除父节点的不确定状态
      }
      else if (hasChecked) {
        checkedKeysSetRef.value.delete(parentNode.key) // 如果有被选中的子节点, 移除父节点的选中状态
        indeterminateRefs.value.add(parentNode.key) // 父节点设置为不确定状态
      }
      else {
        checkedKeysSetRef.value.delete(parentNode.key) // 如果没有子节点被选中, 移除父节点的选中状态
        indeterminateRefs.value.delete(parentNode.key) // 移除父节点的不确定状态
      }

      // 递归更新父节点的父节点
      updateCheckedKeys(parentNode)
    }
  }
}
// 实现级联选择
function checkNode(node: TreeNode, checked: boolean) {
  // console.log('checkNode', node, checked)
  toggleCheckKeys(node, checked)
  updateCheckedKeys(node)
}

onMounted(() => {
  props.defaultCheckedKeys.forEach((key) => {
    const node = findNode(key)
    if (node) {
      toggleCheckKeys(node, true)
    }
  })
})
</script>

<template>
  <div :class="bem.b()">
    <JvVirtualScroll v-if="props.virtualScroll && flattenTree.length" :items="flattenTree" :remain="8" :size="35">
      <template #default="{ node: _node }">
        <JvTreeNode
          :key="_node.label" :node="_node" :label="_node.label" :is-leaf="_node.isLeaf" :level="_node.level"
          :raw-node="_node.rawNode" :expanded="isExpanded(_node)" :loading-keys="loadingKeysRef"
          :selected-keys="selectedKeysRef" :show-checkbox="props.showCheckbox" :checked="isChecked(_node)"
          :disabled="isDisabled(_node)" :indeterminate="isIndeterminate(_node)" @toggle="toggleNode"
          @select="selectNode" @check="checkNode"
        />
      </template>
    </JvVirtualScroll>
    <template v-else>
      <JvTreeNode
        v-for="node in flattenTree" :key="node.key" :node="node" :label="node.label" :is-leaf="node.isLeaf"
        :level="node.level" :raw-node="node.rawNode" :expanded="isExpanded(node)" :loading-keys="loadingKeysRef"
        :selected-keys="selectedKeysRef" :show-checkbox="props.showCheckbox" :checked="isChecked(node)"
        :disabled="isDisabled(node)" :indeterminate="isIndeterminate(node)" @toggle="toggleNode" @select="selectNode"
        @check="checkNode"
      />
    </template>
  </div>
</template>
