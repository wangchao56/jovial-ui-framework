import type { JvAvatarProps } from '@components/JvAvatar/src/JvAvatar'
import type { JvIconProps } from '@components/JvIcon/src/JvIcon'
import type { JvImageProps } from '@components/JvImage/src/JvImage'
import type { ExtractPropTypes, PropType, Slot, SlotsType } from 'vue'

export enum JvListType {
  ITEM = 'item',
  GROUP = 'group',
  DIVIDER = 'divider',
  SUBHEADER = 'subheader',
}
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
export type RoundedType =
  | boolean
  | string
  | number
  | 'rounded'
  | 'rounded-sm'
  | 'rounded-lg'
  | 'rounded-xl'
  | 'rounded-pill'
  | 'rounded-circle'
  | 'rounded-shaped'

// 基础属性接口
interface BaseItem {
  /** 唯一标识 */
  key: string
  /** 禁用状态 */
  disabled?: boolean
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
  /** 展开图标 */
  expandIcon?: JvListGroupProps['expandIcon']
  /** 折叠图标 */
  collapseIcon?: JvListGroupProps['collapseIcon']
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
export type ListItem =
  | ListItemType
  | DividerType
  | SubHeaderType
  | ListGroupType

export interface JvListItemTitleProps {
  title: string
}

export interface JvListItemSubtitleProps {
  subtitle?: string
}

export interface JvListItemPrependProps {
  type?: 'avatar' | 'icon' | 'image'
  icon?: string | JvIconProps
  avatar?: string | JvAvatarProps
  image?: string | JvImageProps
}

export interface JvListItemActionProps {
  icon?: string | JvIconProps
}

export interface JvListItemActionEmits {
  (e: 'click'): void
}

export interface JvListItemTitleSlots {
  default: Slot
}

export interface JvListItemPrependSlots {
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
    default: '$chevronDown',
  },
  /** 折叠图标 */
  collapseIcon: {
    type: String,
    default: '$chevronRight',
  },
  /** 标题 */
  title: String,
  /** 列表数据 */
  children: {
    type: Array as PropType<ListItem[]>,
    default: () => [],
  },
} as const

export const jvListGroupEmits = {
  'update:expanded': (value: boolean) => typeof value === 'boolean',
} as const

export type JvListGroupProps = ExtractPropTypes<typeof jvListGroupProps>

export interface JvListItemContentSlots {
  title: Slot
  subtitle: Slot
  description: Slot
}
