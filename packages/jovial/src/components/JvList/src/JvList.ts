import type { ExtractPropTypes, InjectionKey, PropType, Slot } from 'vue'
import type { ListItem, ListItemType } from './types'

export const jvListProps = {
  tag: {
    type: String as PropType<string>,
    default: 'div',
    description: '自定义根标签',
    required: false,
  },
  items: {
    type: Array as PropType<ListItem[]>,
    default: () => [],
    description: '列表数据',
    required: false,
  },
  bordered: {
    type: Boolean,
    description: '是否显示边框',
    required: false,
  },
  clickable: {
    type: Boolean,
    description: '列表项是否有可点击样式',
    required: false,
  },
  hoverable: {
    type: Boolean,
    description: '列表项是否有悬浮样式',
    required: false,
  },
  selectable: {
    type: Boolean,
    description: '列表项是否可选',
    required: false,
  },
  showDivider: {
    type: Boolean,
    default: false,
    description: '是否显示标项之间的分割线',
    required: false,
  },
  expandedKeys: {
    type: Array as PropType<string[]>,
    default: () => [],
    description: '展开的节点keys',
    required: false,
  },
  defaultExpandAll: {
    type: Boolean,
    default: false,
    description: '是否默认展开所有节点',
    required: false,
  },
  accordion: {
    type: Boolean,
    default: false,
    description: '是否为手风琴模式(同级节点互斥展开)',
    required: false,
  },
  indent: {
    type: Number,
    default: 24,
    description: '树形数据缩进距离',
    required: false,
  },
  itemHeight: {
    type: Number,
    default: 40,
    description: '列表项高度',
    required: false,
  },
  virtual: {
    type: Boolean,
    default: false,
    description: '是否虚拟列表',
    required: false,
  },
  keyField: {
    type: String,
    default: 'key',
    description: '唯一标识的属性名',
    required: false,
  },
  titleField: {
    type: String,
    default: 'title',
    description: '标题的属性名',
    required: false,
  },
  subtitleField: {
    type: String,
    default: 'subtitle',
    description: '副标题的属性名',
    required: false,
  },
  descriptionField: {
    type: String,
    default: 'description',
    description: '描述的属性名',
    required: false,
  },
  childrenField: {
    type: String,
    default: 'children',
    description: '子节点的属性名',
    required: false,
  },
  lines: {
    type: String,
    default: 'one',
    description: '行数',
    required: false,
  },
  // variant: {
  //   type: String,
  //   default: 'text',
  //   description: '变体',
  //   required: false,
  // },
  expandIcon: {
    type: String,
    default: 'chevron-right',
    description: '展开图标',
    required: false,
  },
  collapseIcon: {
    type: String,
    default: 'chevron-down',
    description: '折叠图标',
    required: false,
  },
} as const
export type JvListPropsType = ExtractPropTypes<typeof jvListProps>

export const jvListEmits = {
  'clickItem': (val: ListItemType) => val,
  'selectItem': (val: ListItemType) => val,
  'activateItem': (val: ListItemType) => val,
  'update:expandedKeys': (keys: string[]) => keys.length > 0,
  'expand': (key: string, expanded: boolean) => key && expanded,
} as const

export interface JvListEmits {
  (e: 'clickItem', val: ListItemType): void
  (e: 'selectItem', val: ListItemType): void
  (e: 'activateItem', val: ListItemType): void
  (e: 'update:expandedKeys', keys: string[]): void
  (e: 'expand', key: string, expanded: boolean): void
}

export interface JvListSlots {
  default: Slot
  item: Slot<{ item: ListItem }>
  header: Slot
  footer: Slot
}

export interface JvListExpose {}
export const JvListContextKey: InjectionKey<{
  handleClickListItem: (val: ListItemType) => void
  handleSelectListItem: (val: ListItemType) => void
  isExpanded: (key: string) => boolean
  toggleExpand: (key: string) => void
  indent: number
  props: Readonly<JvListPropsType>
  level: number
}> = Symbol('JvListContextKey')
