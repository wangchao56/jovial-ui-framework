import type { PropType } from 'vue'

export type Align = 'start' | 'end' | 'center' | 'baseline' | 'stretch'
export type Direction = 'horizontal' | 'vertical'
export type Size = 'small' | 'medium' | 'large' | number | [number, number]
export type Justify =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly'
export const spaceProps = {
  inline: Boolean,
  wrap: Boolean,
  size: {
    type: String as PropType<Size>,
    values: ['x-small', 'small', 'medium', 'large', 'x-large'],
    default: 'medium',
  },
  direction: {
    type: String as PropType<Direction>,
    values: ['horizontal', 'vertical'],
    default: 'horizontal',
  },
  justify: {
    type: String as PropType<Justify>,
    values: ['start', 'end', 'center', 'between', 'around', 'evenly'],
    default: 'start',
  },
  align: {
    type: String as PropType<Align>,
    values: ['start', 'end', 'center', 'baseline', 'stretch'],
    default: 'start',
  },
} as const
export interface SpaceProps {
  inline?: boolean
  wrap?: boolean
  size?: Size
  direction?: Direction
  justify?: Justify
  align?: Align
}
