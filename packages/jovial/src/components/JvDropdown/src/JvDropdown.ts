import type { TooltipProps } from '@components/JvTooltip/src/tooltip'

export interface MenuOption {
  type: 'menu' | 'divider' | 'submenu' | 'item'
  /** 标识 */
  label?: string
  /** 显示的内容 */
  value?: any
  /** 唯一标识 */
  key: string
  /** 禁用 */
  disabled?: boolean
  /** 分割线 */
  // divided?: boolean
  /** 子菜单 */
  children?: MenuOption[]
}

export const jvDropdownProps = {} as const

export interface JvDropdownProps {
  menuOptions?: MenuOption[]
  placement?: TooltipProps['placement']
};
export const jvDropdownEmits = {} as const
export interface JvDropdownEmits {
  (e: 'visibleChange', value: boolean): void
  (e: 'clickMenu', payload: MenuOption): void
  (e: 'select', payload: any): void
}
export const jvDropdownSlots = {} as const
export interface JvDropdownSlots {}
export interface JvDropdownExpose {
  show: () => void
  hide: () => void
}
