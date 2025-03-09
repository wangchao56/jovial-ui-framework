import type { ExtractPropTypes, Slot, SVGAttributes } from 'vue'

type Position =
  | 'top'
  | 'center'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center'
// 新增一个不包含 center 的类型
export type PositionExcludeCenter = Exclude<Position, 'center'>
export const jvProgressProps = {
  /** 进度值 0-100 */
  percentage: {
    type: Number,
    default: 0,
    validator: (val: number) => val >= 0 && val <= 100,
  },
  /** 进度条类型 */
  type: {
    type: String as PropType<'line' | 'circle'>,
    values: ['line', 'circle'] as const,
    default: 'line',
  },
  /** 进度条颜色 */
  color: {
    type: String,
    default: '#409eff',
  },
  /** 进度条宽度 */
  strokeWidth: {
    type: Number,
    default: 6,
  },
  /** 进度条圆角 */
  strokeRadius: {
    type: Number,
    default: 0,
  },
  /** 是否显示文字 */
  showText: {
    type: Boolean as PropType<boolean>,
    default: true,
    required: false,
  },
  /** 文字内部显示 */
  textInside: {
    type: Boolean,
    default: false,
  },
  /** 文字显示的位置 */
  textPosition: {
    type: String as PropType<Position>,
    default: 'center',
  },
  /** 大小 */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium',
  },
  /** 进度条背景颜色 */
  bgColor: {
    type: String,
    default: '#e5e5e5',
  },
  /** 进度条值颜色 */
  valueColor: {
    type: String,
    default: '#409eff',
  },
  /** 进度条宽度 */
  width: {
    type: Number,
    default: 100,
  },
} as const

export type ProgressBaseProps = ExtractPropTypes<typeof jvProgressProps>

export interface LineProgressProps
  extends /* @vue-ignore */ Partial<ProgressBaseProps> {
  type: 'line'
  /** 是否显示文字 */
  showText?: boolean
  /** 文字内部显示 */
  textInside?: boolean
  /** 文字显示的位置 */
  textPosition?: Position
  /** 大小 */
  size?: 'small' | 'medium' | 'large'
}

export interface CircleProgressProps
  extends /* @vue-ignore */ Partial<ProgressBaseProps> {
  /** 进度条类型 */
  type: 'circle'
  /** 进度条宽度 */
  width?: number
  /** 进度值 0-100 */
  percentage?: number
  /** 是否显示文字 */
  showText?: boolean
  /** 进度条圆角 */
  strokeLinecap?: SVGAttributes['stroke-linecap']
  /** 动画开启 */
  animation?: boolean
  /** 动画时长 */
  duration?: number
  /** 格式化函数 */
  format?: (percentage: number) => string
}

export interface JvProgressProps extends /* @vue-ignore */ Partial<ProgressBaseProps> {
  /** 进度条类型 */
  type?: 'line' | 'circle'
  /** 进度值 0-100 */
  percentage?: number
  /** 动画开启 */
  animation?: boolean
  /** 进度条宽度 */
  width?: number
  /** 是否显示文字 */
  showText?: boolean
  /** 文字内部显示 */
  textInside?: boolean
  /** 文字显示的位置 */
  textPosition?: Position
  /** 大小 */
  size?: 'small' | 'medium' | 'large'
  /** 进度条背景颜色 */
  bgColor?: string
  /** 进度条值颜色 */
  valueColor?: string
  /** 进度条宽度 */
  strokeWidth?: number
  /** 进度条圆角 */
  strokeRadius?: number
}
export interface JvProgressEmits {
  /** 进度值变化 */
  (e: 'update:percentage', percentage: number): void
  /** 进度条开始 */
  (e: 'start'): void
  /** 进度条结束 */
  (e: 'end'): void
  /** 进度条取消 */
  (e: 'cancel'): void
  /** 进度条暂停 */
  (e: 'pause'): void
  /** 进度条恢复 */
  (e: 'resume'): void
}

export interface JvProgressSlots {
  /** 默认插槽 */
  default?: Slot
  /** 文字插槽 */
  text?: Slot<{
    percentage: number
  }>
}

export interface JvProgressExpose {
  /** 进度值 */
  percentage: number
}

interface JvProgressContext {
  /** 进度条开始 */
  start: () => void
  /** 进度条结束 */
  end: () => void
  /** 进度条取消 */
  cancel: () => void
  /** 进度条暂停 */
  pause: () => void
  /** 进度条恢复 */
  resume: () => void
}

export const jvProgressContextKey: InjectionKey<JvProgressContext> = Symbol.for(
  'jvProgressContextKey',
)
