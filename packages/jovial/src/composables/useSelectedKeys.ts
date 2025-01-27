import { ref } from 'vue'

function useSelectedKeys() {
  const selectedKeys = ref<Set<PropertyKey>>(new Set())

  // 添加选中项
  const addSelectedKey = (key: PropertyKey) => {
    selectedKeys.value.add(key)
  }

  // 移除选中项
  const removeSelectedKey = (key: PropertyKey) => {
    selectedKeys.value.delete(key)
  }

  // 设置选中项（替换所有）
  const setSelectedKeys = (keys: PropertyKey[]) => {
    selectedKeys.value = new Set(keys)
  }

  // 清空所有选中项
  const clearSelectedKeys = () => {
    selectedKeys.value.clear()
  }

  // 检查是否选中
  const isSelected = (key: PropertyKey): boolean => {
    return selectedKeys.value.has(key)
  }

  // 切换选中状态
  const toggleSelectedKey = (key: PropertyKey) => {
    if (isSelected(key)) {
      removeSelectedKey(key)
    }
    else {
      addSelectedKey(key)
    }
  }

  return {
    selectedKeys,
    addSelectedKey,
    removeSelectedKey,
    setSelectedKeys,
    clearSelectedKeys,
    isSelected,
    toggleSelectedKey,
  }
}

export { useSelectedKeys }
