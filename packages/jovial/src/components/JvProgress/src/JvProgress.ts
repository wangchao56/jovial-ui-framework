export const jvProgressProps = {
  // 进度值 0-100
  percentage: {
    type: Number,
    default: 0,
    validator: (val: number) => val >= 0 && val <= 100,
  },
  // 进度条类型
  type: {
    type: String,
    values: ['line', 'circle'] as const,
    default: 'line',
  },
  // 进度条颜色
  color: {
    type: String,
    default: '#409eff',
  },
  // 进度条宽度
  strokeWidth: {
    type: Number,
    default: 6,
  },
  // 是否显示文字
  showText: {
    type: Boolean,
    default: true,
  },
  // 文字内部显示
  textInside: {
    type: Boolean,
    default: false,
  },
} as const

export interface JvProgressProps {
  /* 进度值 0-100 */
  percentage?: number
  /* 进度条类型 */
  type?: 'line' | 'circle'
  /* 进度条颜色 */
  color?: string
  /* 进度条宽度 */
  strokeWidth?: number
  /* 是否显示文字 */
  showText?: boolean
  /* 文字内部显示 */
  textInside?: boolean
}

export interface JvProgressEmits {
  /* 进度值变化 */
  'update:percentage': (percentage: number) => void
  /* 进度条颜色变化 */
  'update:color': (color: string) => void
  /* 进度条宽度变化 */
  'update:strokeWidth': (strokeWidth: number) => void
  /* 是否显示文字变化 */
  'update:showText': (showText: boolean) => void
  /* 文字内部显示变化 */
  'update:textInside': (textInside: boolean) => void
}

export interface JvProgressSlots {
  default?: () => any
}

export interface JvProgressExpose {}
