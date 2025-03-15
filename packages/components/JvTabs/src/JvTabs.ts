import type { RawChildren } from '@components/internal/RenderVnode'
import type { BemRecord } from '@jienix/utils'
import type { Slot } from 'vue'
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
export interface JvTabPaneProps {
  /** 标签页标题 */
  label: string
  /** 标签页名称 */
  name: string
  /** 标签页图标 */
  icon?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否可关闭 */
  closable?: boolean
  /** 标签页内容 */
  content?: RawChildren
}

export const jvTabsProps = {
  /** 当前激活的标签页 key */
  activeKey: {
    type: String,
    default: '',
  },
  /** 标签页列表 */
  tabs: {
    type: Array as () => JvTabPaneProps[],
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
  /** 标签页宽度 */
  width: {
    type: [String, Number] as PropType<string | number>,
    default: '100%',
  },
  /** 标签页高度 */
  height: {
    type: [String, Number] as PropType<string | number>,
    default: '100%',
  },
} as const

export type JvTabsProps = ExtractPropTypes<typeof jvTabsProps>

export interface JvTabsEmits {
  /** 标签页切换时触发 */
  (e: 'update:activeKey', key: string): void
  /** 点击标签页时触发 */
  (e: 'click', key: string, item: JvTabPaneProps): void
  /** 关闭标签页时触发 */
  (e: 'close', key: string, item: JvTabPaneProps): void
  /** 点击添加按钮时触发 */
  (e: 'add'): void
}

export interface JvTabsSlots {
  /** 自定义标签页内容 */
  default?: Slot
}

export interface JvTabsContext {
  activeKey: Ref<string>
  closable: Ref<JvTabsProps['closable']>
  addable: Ref<JvTabsProps['addable']>
  type: Ref<JvTabsProps['type']>
  bem: Readonly<BemRecord>
  // 改变激活的标签页
  changeActiveKey: (key: string) => void
  // 添加标签页
  addTab: (item: JvTabPaneProps) => void
  // 删除标签页
  removeTab: (key: JvTabPaneProps['name']) => void
}

export const jvTabsContextKey: InjectionKey<JvTabsContext>
  = Symbol.for('Jovial:Tabs')
