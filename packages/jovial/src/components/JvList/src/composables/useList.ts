import type { ListItem, ListItemType } from '../types'
import { onMounted, ref } from 'vue'

export function useList(props: any, emit: any) {
  // 选中项管理
  const selectedKeys = ref<Set<string>>(new Set())
  const handleClickListItem = (val: ListItemType) => {
    emit('clickItem', val)
    if ((props.clickable || props.selectable)) {
      selectedKeys.value.add(val.key)
    }
  }
  const handleSelectListItem = (val: ListItemType) => {
    emit('selectItem', val)
    if (props.selectable) {
      selectedKeys.value.add(val.key)
    }
  }

  // 展开项管理
  const expandedKeys = ref<Set<string>>(new Set(props.expandedKeys))
  const isExpanded = (key: string) => expandedKeys.value.has(key)
  const toggleExpand = (key: string) => {
    const newKeys = new Set(expandedKeys.value)

    if (props.accordion) {
      newKeys.clear()
    }

    if (newKeys.has(key)) {
      newKeys.delete(key)
    }
    else {
      newKeys.add(key)
    }

    expandedKeys.value = newKeys
    emit('update:expandedKeys', Array.from(newKeys))
    emit('expand', key, newKeys.has(key))
  }

  // 默认展开所有节点
  const initExpandAll = () => {
    if (props.defaultExpandAll) {
      const allKeys = new Set<string>()
      const collectKeys = (items: ListItem[]) => {
        items.forEach((item) => {
          if (item.children?.length) {
            allKeys.add(item.key)
            collectKeys(item.children)
          }
        })
      }
      collectKeys(props.items)
      expandedKeys.value = allKeys
    }
  }

  onMounted(initExpandAll)

  return {
    selectedKeys,
    handleClickListItem,
    handleSelectListItem,
    expandedKeys,
    isExpanded,
    toggleExpand,
  }
}
