import type { VNodeChild } from 'vue'

export type MenuMode = 'horizontal' | 'vertical'
export type MenuTrigger = 'hover' | 'click'

/** 菜单项配置 */
export interface MenuItem {
  /** 菜单项标识 */
  key: string
  /** 菜单项标题 */
  label: string
  /** 菜单项图标 */
  icon?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 子菜单项 */
  children?: MenuItem[]
}

/** SubmenuType 子菜单 */

export const jvMenuProps = {
  /** 菜单模式 */
  mode: {
    type: String as () => MenuMode,
    default: 'vertical',
  },
  /** 当前选中的菜单项 key */
  modelValue: {
    type: String,
    default: '',
  },
  /** 默认展开的子菜单 keys */
  defaultOpenKeys: {
    type: Array as () => string[],
    default: () => [],
  },
  /** 子菜单打开的触发方式 */
  trigger: {
    type: String as () => MenuTrigger,
    default: 'hover',
  },
  /** 菜单项数据 */
  items: {
    type: Array as () => MenuItem[],
    default: () => [],
  },
  /** 是否收起状态（仅垂直模式有效） */
  collapsed: {
    type: Boolean,
    default: false,
  },
} as const

export interface JvMenuProps {
  mode?: MenuMode
  modelValue?: string
  defaultOpenKeys?: string[]
  trigger?: MenuTrigger
  items?: MenuItem[]
  collapsed?: boolean
}

export interface JvMenuEmits {
  (e: 'update:modelValue', key: string): void
  (e: 'select', key: string, item: MenuItem): void
  (e: 'openChange', keys: string[]): void
}

export const jvMenuSlots = {
  /** 自定义菜单项内容 */
  'item': {},
  /** 自定义子菜单标题 */
  'sub-title': {},
} as const

export interface JvMenuSlots {
  'item'?: (props: { item: MenuItem }) => VNodeChild
  'sub-title'?: (props: { item: MenuItem }) => VNodeChild
}
