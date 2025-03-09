import type { JvIconProps } from '@components/JvIcon'
import type { ExtractPropTypes, Slot } from 'vue'

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
    type: [String, Number] as PropType<JvIconProps['size']>,
    default: 20,
  },
  /** 图标间距 */
  gap: {
    type: [String, Number] as PropType<string | number>,
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
    type: Array as PropType<string[]>,
    default: () => ['极差', '失望', '一般', '满意', '惊喜'],
  },
} as const

export type JvRateProps = ExtractPropTypes<typeof jvRateProps>

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
  icon?: Slot<{ value: number, active: boolean }>
  /** 自定义提示文字 */
  text?: Slot<{ value: number }>
}

export interface JvRateExpose {
  /** 重置评分 */
  reset: () => void
}
