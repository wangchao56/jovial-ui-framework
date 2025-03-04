import { ref } from 'vue'

interface UseSelectedKeysOptions {
  multiple: boolean
  defaultSelectedKeys: PropertyKey[]
}

/**
 * 选中项
 * @param options - 选项
 * @param options.multiple - 是否多选
 * @param options.defaultSelectedKeys - 默认选中项
 * @returns 选中项
 */
function useSelectedKeys(options: UseSelectedKeysOptions) {
  const { multiple = false, defaultSelectedKeys = [] } = options
  const selectedKeys = ref<Set<PropertyKey>>(new Set(defaultSelectedKeys))

  // 添加选中项
  const addSelectedKey = (key: PropertyKey) => {
    if (multiple) {
      selectedKeys.value.add(key)
    }
    else {
      selectedKeys.value = new Set([key])
    }
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
