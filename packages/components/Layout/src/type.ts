import type { JvSpaceProps } from '@components/JvSpace'

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
  space?: JvSpaceProps['size']
  spaceAlign?: JvSpaceProps['align']
  spaceJustify?: JvSpaceProps['justify']
  spaceDirection?: JvSpaceProps['direction']
  spaceWrap?: JvSpaceProps['wrap']
}
