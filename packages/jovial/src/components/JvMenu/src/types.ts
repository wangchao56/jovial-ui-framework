export type MenuMode = 'horizontal' | 'vertical'
export type MenuTrigger = 'hover' | 'click'
export type MenuTheme = 'light' | 'dark'
/** 菜单项配置 */
export type MenuItem = MenuItemType | MenuItemGroupType | MenuDividerType | MenuItemGroupType | SubMenuType

export enum ItemType {
  Item = 'item',
  Group = 'group',
  Divider = 'divider',
  SubMenu = 'sub-menu',
}

export interface MenuItemType {
  /** 菜单组提示 */
  tooltip?: string
  /** 菜单项类型 */
  type: ItemType.Item
  /** 展示错误状态样式 */
  danger?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 菜单图标 */
  icon?: string | ((item: MenuItem) => VNode)
  /** item 的唯一标志 */
  key: PropertyKey
  /** 菜单项标题 */
  label: string | ((item: MenuItem) => VNode)
  /** 菜单项标题（hover 时显示） */
  title?: string
}

export interface MenuItemGroupType {
  type: ItemType.Group
  /** 菜单组标题 */
  label: string
  /** 菜单组标识 */
  key: PropertyKey
  /** 菜单组子菜单项 */
  children?: MenuItem[]
}

export interface MenuDividerType {
  type: ItemType.Divider
  /** 分割线标识 */
  key: PropertyKey
  /** 是否虚线 */
  dashed?: boolean
}

export interface SubMenuType {
  type: ItemType.SubMenu
  /** 子菜单的菜单项 */
  children?: MenuItem[]
  /** 是否禁用 */
  disabled?: boolean
  /** 菜单图标 */
  icon?: string | ((item: SubMenuType) => VNode)
  /** 唯一标志 */
  key: PropertyKey
  /** 菜单项标题 */
  label: string | ((item: SubMenuType) => VNode)
  /** 子菜单样式，mode="inline" 时无效 */
  popupClassName?: string
  /** 子菜单偏移量，mode="inline" 时无效 */
  popupOffset?: [number, number]
  /** 设置子菜单的主题 */
  theme?: MenuTheme
  /** 点击子菜单标题的回调 */
  onTitleClick?: (params: { key: PropertyKey, domEvent: MouseEvent }) => void
}

export type MenuChildren = MenuItem[] | MenuItemGroupType | MenuDividerType | SubMenuType
