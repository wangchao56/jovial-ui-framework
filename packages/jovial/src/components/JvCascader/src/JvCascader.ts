import type { ExtractPropTypes, Slot } from 'vue'

export interface CascaderOption {
  value: string | number
  label: string
  children?: CascaderOption[]
  disabled?: boolean
}

export const jvCascaderProps = {
  /**
   * 绑定值
   */
  modelValue: {
    type: Array as PropType<(string | number)[]>,
    default: () => [],
  },
  /**
   * 选项数据
   */
  options: {
    type: Array as PropType<CascaderOption[]>,
    default: () => [],
  },
  /**
   * 占位符
   */
  placeholder: {
    type: String,
    default: '请选择',
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否可清除
   */
  clearable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否可过滤
   */
  filterable: {
    type: Boolean,
    default: false,
  },
  /**
   * 分隔符
   */
  separator: {
    type: String,
    default: ' / ',
  },
} as const

export type JvCascaderProps = ExtractPropTypes<typeof jvCascaderProps>

export interface JvCascaderEmits {
  (e: 'update:modelValue', value: (string | number)[]): void
  (e: 'change', value: (string | number)[]): void
  (e: 'visibleChange', value: boolean): void
}

export interface JvCascaderSlots {
  /**
   * 默认插槽
   */
  default?: Slot
  /**
   * 空插槽
   */
  empty?: Slot
}

export interface JvCascaderExpose {
  /**
   * 聚焦
   */
  focus: () => void
  /**
   * 失焦
   */
  blur: () => void
}
