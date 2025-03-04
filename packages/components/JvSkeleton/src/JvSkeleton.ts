import type { PropType } from 'vue'

export type SkeletonType = 'text' | 'avatar' | 'button' | 'image' | 'card' | 'list'

export const jvSkeletonProps = {
  // 骨架屏类型
  type: {
    type: String as () => SkeletonType,
    default: 'text',
  },
  // 是否正在加载
  loading: {
    type: Boolean,
    default: true,
  },
  // 行数
  rows: {
    type: Number,
    default: 1,
  },
  // 是否显示动画效果
  animated: {
    type: Boolean,
    default: true,
  },
  // 宽度
  width: {
    type: [String, Number] as PropType<string | number>,
    default: '100%',
  },
  // 高度
  height: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
} as const

export interface JvSkeletonProps {
  type?: SkeletonType
  loading?: boolean
  rows?: number
  animated?: boolean
  width?: string | number
  height?: string | number
}

export interface JvSkeletonEmits {
  'update:loading': [value: boolean]
}

export interface JvSkeletonSlots {
  default?: () => any
}

export interface JvSkeletonExpose {
  // 暴露的方法和属性
}
