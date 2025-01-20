export const jvDividerProps = {} as const
export interface JvDividerProps {
  /** 标题 */
  title?: string
  /** 标题位置 */
  titlePosition?: 'left' | 'center' | 'right'
  /** 颜色 */
  color?: string
  /** 虚线 */
  dashed?: boolean
  /** 线条宽度 */
  strokeWidth?: number
  /** 线条样式 */
  strokeStyle?: 'solid' | 'dashed'
  /** 线条方向 */
  direction?: 'horizontal' | 'vertical'
  /** 线条长度 */
  length?: number | 'full'

};
export const jvDividerEmits = {} as const
export interface JvDividerEmits {}
export const jvDividerSlots = {} as const
export interface JvDividerSlots {}
export interface JvDividerExpose {}
