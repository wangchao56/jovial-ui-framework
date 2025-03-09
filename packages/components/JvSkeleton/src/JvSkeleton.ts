import type { PropType, Slot } from 'vue'

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

export type JvSkeletonProps = Partial<ExtractPropTypes<typeof jvSkeletonProps>>

export interface JvSkeletonEmits {
  /**
   * 更新 loading 状态
   * @param {boolean} value - 新的 loading 状态
   */
  (e: 'update:loading', value: boolean): void
}

export interface JvSkeletonSlots {
  /**
   * 默认插槽
   */
  default?: Slot
}

export interface JvSkeletonExpose {
  // 暴露的方法和属性
}
