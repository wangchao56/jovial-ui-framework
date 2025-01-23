import type { SpaceProps } from '@components/JvSpace'

export type ColSize = number | { span?: number, offset?: number }
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface JvColProps {
  span?: number
  offset?: number
  xs?: ColSize
  sm?: ColSize
  md?: ColSize
  lg?: ColSize
  xl?: ColSize
}
export interface JvRowProps {
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
  align?: 'top' | 'middle' | 'bottom'
  gutter?: number | [number, number]
  wrap?: boolean
}
export interface JvColSpaceProps extends JvColProps {
  space?: SpaceProps['size']
  spaceAlign?: SpaceProps['align']
  spaceJustify?: SpaceProps['justify']
  spaceDirection?: SpaceProps['direction']
  spaceWrap?: SpaceProps['wrap']
}
