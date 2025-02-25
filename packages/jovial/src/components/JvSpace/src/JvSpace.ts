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
export const jvSpaceProps = {
  /**
   * 是否为行内元素
   */
  inline: Boolean,
  /**
   * 是否换行
   */
  wrap: Boolean,
  /**
   * 间距大小
   */
  size: {
    type: String as PropType<Size>,
    values: ['x-small', 'small', 'medium', 'large', 'x-large'],
    default: 'medium',
  },
  /**
   * 排列方向
   */
  direction: {
    type: String as PropType<Direction>,
    values: ['horizontal', 'vertical'],
    default: 'horizontal',
  },
  /**
   * 水平对齐方式
   */
  justify: {
    type: String as PropType<Justify>,
    values: ['start', 'end', 'center', 'between', 'around', 'evenly'],
    default: 'start',
  },
  /**
   * 垂直对齐方式
   */
  align: {
    type: String as PropType<Align>,
    values: ['start', 'end', 'center', 'baseline', 'stretch'],
    default: 'start',
  },
} as const
export type JvSpaceProps = ExtractPropTypes<typeof jvSpaceProps>
