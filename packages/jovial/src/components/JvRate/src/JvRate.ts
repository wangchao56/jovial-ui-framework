import type { VNodeChild } from 'vue'

export const jvRateProps = {
  /** 当前值 */
  modelValue: {
    type: Number,
    default: 0,
  },
  /** 最大值 */
  max: {
    type: Number,
    default: 5,
  },
  /** 是否允许半选 */
  allowHalf: {
    type: Boolean,
    default: false,
  },
  /** 是否只读 */
  readonly: {
    type: Boolean,
    default: false,
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 图标名称 */
  icon: {
    type: String,
    default: 'star',
  },
  /** 未选中图标名称 */
  voidIcon: {
    type: String,
    default: 'star-outline',
  },
  /** 图标大小 */
  size: {
    type: [String, Number],
    default: 20,
  },
  /** 图标间距 */
  gap: {
    type: [String, Number],
    default: 4,
  },
  /** 选中颜色 */
  color: {
    type: String,
    default: '#fadb14',
  },
  /** 未选中颜色 */
  voidColor: {
    type: String,
    default: '#c0c4cc',
  },
  /** 是否显示提示文字 */
  showText: {
    type: Boolean,
    default: false,
  },
  /** 提示文字数组 */
  texts: {
    type: Array as () => string[],
    default: () => ['极差', '失望', '一般', '满意', '惊喜'],
  },
} as const

export interface JvRateProps {
  /** 当前值 */
  modelValue?: number
  /** 最大值 */
  max?: number
  /** 是否允许半选 */
  allowHalf?: boolean
  /** 是否只读 */
  readonly?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 图标名称 */
  icon?: string
  /** 未选中图标名称 */
  voidIcon?: string
  /** 图标大小 */
  size?: string | number
  /** 图标间距 */
  gap?: string | number
  /** 选中颜色 */
  color?: string
  /** 未选中颜色 */
  voidColor?: string
  /** 是否显示提示文字 */
  showText?: boolean
  /** 提示文字数组 */
  texts?: string[]
}

export const jvRateEmits = {
  /** 值改变时触发 */
  'update:modelValue': (value: number) => typeof value === 'number',
  /** 值改变时触发 */
  'change': (value: number) => typeof value === 'number',
  /** 鼠标移入时触发 */
  'hover': (value: number) => typeof value === 'number',
} as const

export interface JvRateEmits {
  /** 值改变时触发 */
  (e: 'update:modelValue', value: number): void
  /** 值改变时触发 */
  (e: 'change', value: number): void
  /** 鼠标移入时触发 */
  (e: 'hover', value: number): void
}

export interface JvRateSlots {
  /** 自定义图标 */
  icon?: (props: { value: number, active: boolean }) => VNodeChild
  /** 自定义提示文字 */
  text?: (props: { value: number }) => VNodeChild
}

export interface JvRateExpose {
  /** 重置评分 */
  reset: () => void
}
