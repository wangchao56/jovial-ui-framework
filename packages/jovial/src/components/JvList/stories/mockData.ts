import type { ListItem } from '../src/types'

export const basicListItems: ListItem[] = [
  {
    type: 'item',
    key: '1',
    title: '基础列表项 1',
    subtitle: '副标题',
    description: '描述文本',
  },
  // ... 更多示例数据
]

export const treeData: ListItem[] = [
  {
    type: 'group',
    key: '1',
    title: '分组 1',
    children: [
      // ... 树形数据
    ],
  },
  // ... 更多示例数据
]
