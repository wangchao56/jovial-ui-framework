import type { VNodeChild } from 'vue'

export type TabPosition = 'top' | 'right' | 'bottom' | 'left'
export type TabType = 'line' | 'card' | 'segment'

/** 标签页配置 */
export interface TabPane {
  /** 标签页标识 */
  key: string
  /** 标签页标题 */
  label: string
  /** 标签页图标 */
  icon?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否可关闭 */
  closable?: boolean
  /** 标签页内容 */
  content?: string | (() => VNodeChild)
}

export const jvTabsProps = {
  /** 当前激活的标签页 key */
  modelValue: {
    type: String,
    default: '',
  },
  /** 标签页列表 */
  items: {
    type: Array as () => TabPane[],
    default: () => [],
  },
  /** 标签页位置 */
  position: {
    type: String as () => TabPosition,
    default: 'top',
  },
  /** 标签页类型 */
  type: {
    type: String as () => TabType,
    default: 'line',
  },
  /** 是否可关闭标签页 */
  closable: {
    type: Boolean,
    default: false,
  },
  /** 是否显示标签页添加按钮 */
  addable: {
    type: Boolean,
    default: false,
  },
} as const

export interface JvTabsProps {
  /** 当前激活的标签页 key */
  modelValue?: string
  /** 标签页列表 */
  items?: TabPane[]
  /** 标签页位置 */
  position?: TabPosition
  /** 标签页类型 */
  type?: TabType
  /** 是否可关闭标签页 */
  closable?: boolean
  /** 是否显示标签页添加按钮 */
  addable?: boolean
}

export interface JvTabsEmits {
  /** 标签页切换时触发 */
  (e: 'update:modelValue', key: string): void
  /** 点击标签页时触发 */
  (e: 'click', key: string, item: TabPane): void
  /** 关闭标签页时触发 */
  (e: 'close', key: string, item: TabPane): void
  /** 点击添加按钮时触发 */
  (e: 'add'): void
}

export interface JvTabsSlots {
  /** 自定义标签页标题 */
  label?: (props: { item: TabPane }) => VNodeChild
  default?: (props: { item: TabPane }) => VNodeChild
}
