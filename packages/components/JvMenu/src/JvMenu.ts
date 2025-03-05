import type { Variant } from '@jienix/typings'
import type { DeepReadonly, InjectionKey, VNodeChild } from 'vue'
import type { MenuItem, MenuMode, MenuTheme, MenuTrigger, SubMenuType } from './types'

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
  selectedKeys: {
    type: Array as () => PropertyKey[],
    default: [],
  },
  /** 菜单项数据 */
  items: {
    type: Array as () => MenuItem[],
    default: () => [],
  },
  theme: String,
} as const

export interface JvMenuProps {
  /** 菜单模式 */
  mode?: MenuMode
  /** 默认展开的子菜单 keys */
  defaultOpenKeys?: PropertyKey[]
  /** 默认选中的菜单项 keys */
  defaultSelectedKeys?: PropertyKey[]
  /** 子菜单打开的触发方式 */
  trigger?: MenuTrigger
  /** 当前选中的菜单项 keys */
  selectedKeys?: PropertyKey[]
  /** 菜单项数据 */
  items: MenuItem[]
  /** 菜单主题 */
  theme?: MenuTheme
  /** 是否多选 */
  multiple?: boolean
  /** 变体 */
  variant?: Variant
  /** 是否启用路由 启用后会使用items中的path作为路由 */
  router?: boolean
}

export const jvMenuEmits = {
  click: (item: MenuItem, key: PropertyKey, keyPath: PropertyKey[]) => item && key && keyPath,
} as const
export interface JvMenuEmits {
  (e: 'update:selectedKeys', keys: PropertyKey[]): void
  (e: 'update:openKeys', keys: PropertyKey[]): void
  (e: 'select', key: PropertyKey, item: MenuItem): void
  (e: 'openChange', keys: PropertyKey[]): void
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

export interface JvMenuContext {
  mode: Readonly<string>
  trigger: Readonly<MenuTrigger>
  openKeys: DeepReadonly<Ref<Set<PropertyKey>>>
  selectedKeys: DeepReadonly<Ref<Set<PropertyKey>>>
  items: DeepReadonly<MenuItem[]>
  onSelect: (key: PropertyKey, item: MenuItem) => void
  onOpenChange: (key: PropertyKey, expanded: boolean, item: SubMenuType) => void
}
export const JvMenuContextKey: InjectionKey<JvMenuContext> = Symbol.for('Jovial:Menu')
