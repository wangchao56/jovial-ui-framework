import type { Slot, VNodeChild } from 'vue'
/**
支持多种标签页位置：顶部、右侧、底部、左侧
支持多种标签页类型：线条、卡片、分段
支持可关闭标签页
支持添加标签页
5. 支持自定义标签页标题和内容
支持禁用标签页
完整的动画效果
 */
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

export type JvTabsProps = Partial<ExtractPropTypes<typeof jvTabsProps>>

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
  label?: Slot<{ item: TabPane }>
  /** 自定义标签页内容 */
  default?: Slot<{ item: TabPane }>
}
