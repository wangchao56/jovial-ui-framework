import type { ExtractPropTypes, PropType, Slot, SlotsType } from 'vue'

/**
 * 提取插槽的参数类型
 * 如果是带参数的插槽，返回参数类型
 * 如果是无参数插槽，返回 void
 */
type ExtractSlotParams<S> = S extends Slot<infer T> ? T : void

/**
 * 将 Slots 接口转换为 SlotsType 类型
 */
export type ExtractSlotsType<T extends {} = Record<string, Slot>> = SlotsType<{
  [K in keyof T]: ExtractSlotParams<T[K]>
}>
// 首先定义 rounded 的类型
type RoundedType = boolean | string | number | 'rounded' | 'rounded-sm' | 'rounded-lg' | 'rounded-xl' | 'rounded-pill' | 'rounded-circle' | 'rounded-shaped'

// 基础属性接口
interface BaseItem {
  /** 唯一标识 */
  key: string
  /** 禁用状态 */
  disabled?: boolean
  /** props属性 */
  props?: JvListItemProps
}

// 普通列表项
export interface ListItemType extends BaseItem {
  /** 类型 */
  type: 'item'
  /** 标题 */
  title?: string
  /** 副标题 */
  subtitle?: string
  /** 描述文本 */
  description?: string
  /** 自定义属性 */
  [key: string]: unknown
}
// 分组
export interface ListGroupType extends BaseItem {
  type: 'group'
  /** 标题文本 */
  title: string
  /** 前置图标 */
  prependIcon?: string
  /** 子项列表 */
  children: ListItem[]
}
// 分割线
export interface DividerType extends BaseItem {
  type: 'divider'
  /** 是否为垂直分割线 */
  vertical?: boolean
  /** 是否虚线 */
  dashed?: boolean
  /** 分割线文本 */
  text?: string
}
// 子标题
export interface SubHeaderType extends BaseItem {
  type: 'subheader'
  /** 标题文本 */
  title: string
  /** 是否固定 */
  sticky?: boolean
  /** 是否缩进 */
  inset?: boolean
}
// 联合类型
export type ListItem = ListItemType | DividerType | SubHeaderType | ListGroupType

// Props 类型定义
export const jvListItemProps = {
  /** 标题 */
  title: {
    type: String,
    default: '',
  },
  /** 副标题 */
  subtitle: {
    type: String,
    default: '',
  },
  /** 描述文本 */
  description: {
    type: String,
    default: '',
  },
  /** 根元素标签 */
  tag: {
    type: String,
    default: 'li',
  },
  /** 根元素类名 */
  class: String,
  /** 激活状态 */
  active: {
    type: Boolean,
    default: false,
  },
  /** 激活状态下的背景色 */
  activeColor: String,
  /** 非激活状态下的背景色 */
  inactiveColor: String,
  /** 是否可悬浮 */
  hoverable: {
    type: Boolean,
    default: false,
  },
  /** 是否显示分割线 */
  showDivider: {
    type: Boolean,
    default: false,
  },
  /** 是否为链接 */
  link: {
    type: Boolean,
    default: false,
  },
  /** 链接地址 */
  href: String,
  /** 前置头像 */
  prependAvatar: String,
  /** 前置图标 */
  prependIcon: String,
  /** 后置图标 */
  appendIcon: String,
  /** 圆角设置 */
  rounded: {
    type: [Boolean, String, Number] as PropType<RoundedType>,
    default: false,
    validator: (value: boolean | string | number) => {
      if (typeof value === 'boolean')
        return true
      if (typeof value === 'string') {
        return ['rounded', 'rounded-sm', 'rounded-lg', 'rounded-xl', 'rounded-pill', 'rounded-circle', 'rounded-shaped'].includes(value)
      }
      if (typeof value === 'number') {
        return value >= 0
      }
      return false
    },
  },
  /** 是否有子节点 */
  hasChildren: {
    type: Boolean,
    default: false,
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 是否选中 */
  selected: {
    type: Boolean,
    default: false,
  },
  /** 是否可点击 */
  clickable: {
    type: Boolean,
    default: false,
  },
  /** 是否可以展开 */
  expandable: {
    type: Boolean,
    default: false,
  },
  /** 是否展开 */
  expanded: {
    type: Boolean,
    default: false,
  },
  /** 元数据 */
  metaRaw: {
    type: Object as PropType<ListItem | ListGroupType>,
    default: () => ({}),
  },
} as const

// Props 类型
export type JvListItemProps = ExtractPropTypes<typeof jvListItemProps>

export interface EmitOptions {
  key: string
  isActive: boolean
  isSelected: boolean
  isClickable: boolean
  isHoverable: boolean
  isDisabled: boolean
  isExpanded: boolean
  // select: (val: ListItemType) =>  boolean
  // expand: (key: string, expanded: boolean) => boolean
}

// Emits 定义
export const jvListItemEmits = {
  'click': (e: MouseEvent | KeyboardEvent, options: EmitOptions) => e && options,
  'select': (options: EmitOptions) => options,
  'expand': (options: EmitOptions) => options,
  'update:expanded': (value: boolean) => typeof value === 'boolean',
} as const

// Emits 类型
export interface JvListItemEmits {
  (e: 'click', event: MouseEvent | KeyboardEvent, options: EmitOptions): void
  (e: 'select', options: EmitOptions): void
  (e: 'expand', options: EmitOptions): void
  (e: 'update:expanded', value: boolean): void
}

// Slots 类型
export interface JvListItemSlots {
  default?: Slot
  title?: Slot
  subtitle?: Slot
  description?: Slot
  prepend?: Slot
  append?: Slot
  expand?: Slot
}

export type JvListItemSlotsType = ExtractSlotsType<JvListItemSlots>

// 组件暴露的方法
export interface JvListItemExpose {
  /** 是否激活 */
  isActive: boolean | undefined
  /** 选择 */
  select: (selected: boolean, e: Event) => void
}

export interface JvListItemTitleProps {
  tag: string
  title: string
}

export interface JvListItemSubtitleProps {
  tag: string
  subtitle?: string
}

export interface JvListItemActionProps {
  tag: string
  actions?: string[]
}

export interface JvListItemTitleSlots {
  default: Slot
}

export const jvListGroupProps = {
  tag: {
    type: String,
    default: 'div',
  },
  /** 展开图标 */
  expandIcon: {
    type: String,
    default: 'chevron-right',
  },
  collapseIcon: {
    type: String,
    default: 'chevron-down',
  },
  /** 标题 */
  title: String,
  /** 是否展开 */
  expanded: Boolean,
  /** 列表数据 */
  items: {
    type: Array as PropType<ListItem[]>,
    default: () => [],
  },
  /** 是否有子节点 */
  hasChildren: {
    type: Boolean,
    default: false,
  },
  /** 原数据 */
  metaRaw: {
    type: Object as PropType<ListGroupType>,
    default: () => ({}),
  },
} as const

export type JvListGroupProps = ExtractPropTypes<typeof jvListGroupProps>
