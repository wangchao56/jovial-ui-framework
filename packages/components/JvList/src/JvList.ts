import type {
  ExtractPropTypes,
  InjectionKey,
  PropType,
  Ref,
  Slot,
  ToRefs,
} from 'vue'
import type { ListItem, ListItemType } from './types'

export const jvListProps = {
  tag: {
    type: String as PropType<string>,
    default: 'ul',
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
  activeable: {
    type: Boolean,
    description: '列表项是否可激活',
    required: false,
  },
  hoverable: {
    type: Boolean,
    description: '列表项是否有悬浮样式',
    required: false,
    default: true,
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
  defaultExpandedKeys: {
    type: Array as PropType<string[]>,
    default: () => [],
    description: '默认展开的节点keys',
    required: false,
  },
  defaultSelectedKeys: {
    type: Array as PropType<string[]>,
    default: () => [],
    description: '默认选中的节点keys',
    required: false,
  },
  defaultActiveKey: {
    type: String,
    default: '',
    description: '定义激活的节点key',
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
    default: 45,
    description: '列表项高度',
    required: false,
  },
  virtual: {
    type: Boolean,
    default: false,
    description: '是否虚拟列表',
    required: false,
  },
  lines: {
    type: String as PropType<'one' | 'two' | 'three'>,
    default: 'one',
    description: '行数',
    required: false,
  },
  expandIcon: {
    type: String,
    default: '$chevron-right',
    description: '展开图标',
    required: false,
  },
  collapseIcon: {
    type: String,
    default: '$chevron-down',
    description: '折叠图标',
    required: false,
  },
} as const
export type JvListPropsType = ExtractPropTypes<typeof jvListProps>

export interface JvListEmits {
  /** 点击列表项 */
  (e: 'clickItem', val: ListItemType): void
  /** 选中列表项 */
  (e: 'selectItem', val: ListItemType): void
  /** 激活列表项 */
  (e: 'activateItem', val: ListItemType): void
}

export interface JvListSlots {
  /** 默认插槽 */
  default: Slot
  /** 列表项插槽 */
  item: Slot<{ item: ListItem }>
  /** 头部插槽 */
  header: Slot
  /** 底部插槽 */
  footer: Slot
}

export interface JvListExpose {
  /** 展开节点 */
  expandItem: (key: string, expanded: boolean) => void
  /** 选中节点 */
  selectItem: (key: string) => void
  /** 激活节点 */
  activateItem: (key: string) => void
}

export interface JvListContext {
  handleClickListItem: (val: ListItemType) => void
  handleSelectListItem: (val: ListItemType) => void
  handleActivateListItem: (val: ListItemType) => void
  /** 展开节点 */
  onExpanded: (key: string, expanded: boolean) => void
  /** 选中节点 */
  selectedKeys: Ref<string[]>
  /** 激活节点 */
  activeKey: Ref<string>
  /** 展开节点 */
  expandedKeys: Ref<string[]>
  /** 缩进 */
  indent: number
  /** 列表数据 */
  items: ListItem[]
  /** 属性 */
  props: ToRefs<JvListPropsType>
}

export const JvListContextKey: InjectionKey<JvListContext>
  = Symbol.for('JvListContextKey')
