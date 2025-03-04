import type { ListItem, ListItemType } from '../types'

interface ListDataOptions {
  defaultExpandAll?: boolean
  accordion?: boolean
  expandedKeys?: string[]
  onExpand?: (key: string, expanded: boolean) => void
}

interface FieldNames {
  key: string
  title: string
  subtitle?: string
  description?: string
  children?: string
  type?: string
}

// 转换单个节点
function transformNode(node: any, fieldNames: FieldNames): ListItem {
  const finalFieldNames = Object.assign({ key: 'key', title: 'title', subtitle: 'subtitle', description: 'description', children: 'children', type: 'item' }, fieldNames)
  const { key, title, subtitle, description, children, type = 'item' } = finalFieldNames

  const baseNode = {
    key: node[key],
    type: node[type],
    title: node[title],
    subtitle: node[subtitle],
    description: node[description],
  } as ListItem

  if (children && node[children]?.length) {
    if (baseNode.type === 'group') {
      (baseNode as any).children = node[children].map((child: any) =>
        transformNode(child, fieldNames),
      )
    }
  }

  return baseNode
}

// 转换整个列表数据
export function transformListData(data: any[], fieldNames: FieldNames): ListItem[] {
  return data.map(node => transformNode(node, fieldNames))
}

export function useListData(
  rawItems: any[],
  options: ListDataOptions = {},
  fieldNames: FieldNames = { key: 'key', title: 'title' },
) {
  // 转换数据
  const items = computed(() => transformListData(rawItems, fieldNames))

  // 选中项管理
  const selectedKeys = ref<Set<string>>(new Set())
  const selectedItems = ref<ListItemType[]>([])

  // 展开项管理
  const expandedKeys = ref<Set<string>>(new Set(options.expandedKeys))

  // 初始化展开状态
  const initExpandedState = () => {
    if (options.defaultExpandAll) {
      const allKeys = new Set<string>()
      const collectKeys = (nodes: ListItem[]) => {
        nodes.forEach((node) => {
          if (node.type === 'group' && node.children?.length) {
            allKeys.add(node.key)
            collectKeys(node.children)
          }
        })
      }
      collectKeys(items.value)
      expandedKeys.value = allKeys
    }
  }

  // 切换展开状态
  const toggleExpand = (key: string) => {
    const newKeys = new Set(expandedKeys.value)

    if (options.accordion) {
      // 手风琴模式，清除同级节点的展开状态
      newKeys.clear()
    }

    if (newKeys.has(key)) {
      newKeys.delete(key)
    }
    else {
      newKeys.add(key)
    }

    expandedKeys.value = newKeys
    options.onExpand?.(key, newKeys.has(key))
  }

  // 判断节点是否展开
  const isExpanded = (key: string) => expandedKeys.value.has(key)

  // 选择节点
  const selectItem = (item: ListItemType) => {
    selectedKeys.value.add(item.key)
    selectedItems.value.push(item)
  }

  // 取消选择
  const deselectItem = (item: ListItemType) => {
    selectedKeys.value.delete(item.key)
    selectedItems.value = selectedItems.value.filter(i => i.key !== item.key)
  }

  // 判断节点是否选中
  const isSelected = (key: string) => selectedKeys.value.has(key)

  // 展开所有节点
  const expandAll = () => {
    const allKeys = new Set<string>()
    const collectKeys = (nodes: ListItem[]) => {
      nodes.forEach((node) => {
        if (node.type === 'group' && node.children?.length) {
          allKeys.add(node.key)
          collectKeys(node.children)
        }
      })
    }
    collectKeys(items.value)
    expandedKeys.value = allKeys
  }

  // 折叠所有节点
  const collapseAll = () => {
    expandedKeys.value.clear()
  }

  // 初始化
  onMounted(() => {
    initExpandedState()
  })

  return {
    items: readonly(items),
    selectedKeys: readonly(selectedKeys),
    selectedItems: readonly(selectedItems),
    expandedKeys: readonly(expandedKeys),
    isExpanded,
    isSelected,
    toggleExpand,
    selectItem,
    deselectItem,
    expandAll,
    collapseAll,
  }
}
