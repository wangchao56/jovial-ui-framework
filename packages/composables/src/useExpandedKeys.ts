import { ref } from 'vue'

/**
 * 展开节点
 * @returns 展开节点
 */
function useExpandedKeys() {
  const expandedKeys = ref<Set<PropertyKey>>(new Set())

  // 展开指定节点
  const expandKey = (key: PropertyKey) => {
    expandedKeys.value.add(key)
  }

  // 收起指定节点
  const collapseKey = (key: PropertyKey) => {
    expandedKeys.value.delete(key)
  }

  // 切换展开/收起状态
  const toggleKey = (key: PropertyKey) => {
    if (expandedKeys.value.has(key)) {
      expandedKeys.value.delete(key)
    }
    else {
      expandedKeys.value.add(key)
    }
  }

  // 设置展开节点（替换所有）
  const setExpandedKeys = (keys: PropertyKey[]) => {
    expandedKeys.value = new Set(keys)
  }

  // 收起所有节点
  const collapseAll = () => {
    expandedKeys.value.clear()
  }

  // 检查节点是否展开
  const isExpanded = (key: PropertyKey): boolean => {
    return expandedKeys.value.has(key)
  }

  return {
    expandedKeys,
    expandKey,
    collapseKey,
    toggleKey,
    setExpandedKeys,
    collapseAll,
    isExpanded,
  }
}

export {
  useExpandedKeys,
}
export type UseExpandedKeys = ReturnType<typeof useExpandedKeys>
