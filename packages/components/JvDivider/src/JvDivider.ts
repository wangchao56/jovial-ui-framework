export const jvDividerProps = {
  /** 标题 */
  title: {
    type: String,
    default: '',
  },
  /** 标题位置 */
  titlePosition: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center',
  },
  /** 颜色 */
  color: {
    type: String,
    default: '',
  },
  /** 虚线 */
  dashed: {
    type: Boolean,
    default: false,
  },
  /** 线条宽度(px) */
  strokeWidth: {
    type: Number,
    default: 1,
  },
  /** 线条方向 */
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },
  /** 线条长度(px) */
  length: {
    type: [Number, String] as PropType<number | 'full'>,
    default: 'full',
  },
  /** 上下间距(px) */
  margin: {
    type: Number,
    default: 16,
  },
  /** 标题背景色 */
  titleBackground: {
    type: String,
    default: '',
  },
} as const
export type JvDividerProps = ExtractPropTypes<typeof jvDividerProps>
export const jvDividerEmits = {} as const
export interface JvDividerEmits {}
export const jvDividerSlots = {} as const
export interface JvDividerSlots {}
export interface JvDividerExpose {}
