import type { VNodeChild } from 'vue'

/** 选项配置 */
export interface SelectOption {
  /** 选项值 */
  value: string | number
  /** 选项标签 */
  label: string
  /** 是否禁用 */
  disabled?: boolean
  /** 分组标题 */
  group?: string
}

export const jvSelectProps = {
  /** 选中值 */
  modelValue: {
    type: [String, Number, Array] as unknown as () => string | number | (string | number)[],
    default: '',
  },
  /** 选项列表 */
  options: {
    type: Array as () => SelectOption[],
    default: () => [],
  },
  /** 占位文本 */
  placeholder: {
    type: String,
    default: '请选择',
  },
  /** 是否多选 */
  multiple: {
    type: Boolean,
    default: false,
  },
  /** 是否可清空 */
  clearable: {
    type: Boolean,
    default: false,
  },
  /** 是否可搜索 */
  filterable: {
    type: Boolean,
    default: false,
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 下拉框宽度 */
  dropdownWidth: {
    type: [String, Number],
    default: '',
  },
  /** 最大显示标签数 */
  maxTagCount: {
    type: Number,
    default: 0,
  },
} as const

export interface JvSelectProps {
  /** 选中值 */
  modelValue?: string | number | (string | number)[]
  /** 选项列表 */
  options?: SelectOption[]
  /** 占位文本 */
  placeholder?: string
  /** 是否多选 */
  multiple?: boolean
  /** 是否可清空 */
  clearable?: boolean
  /** 是否可搜索 */
  filterable?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 下拉框宽度 */
  dropdownWidth?: string | number
  /** 最大显示标签数 */
  maxTagCount?: number
}

export interface JvSelectEmits {
  /** 选中值改变时触发 */
  (e: 'update:modelValue', value: string | number | (string | number)[]): void
  /** 选中值改变时触发 */
  (e: 'change', value: string | number | (string | number)[]): void
  /** 下拉框显示状态改变时触发 */
  (e: 'visibleChange', visible: boolean): void
  /** 清空选项时触发 */
  (e: 'clear'): void
}

export interface JvSelectSlots {
  /** 自定义选项内容 */
  option?: (props: { option: SelectOption }) => VNodeChild
  /** 自定义选中值的显示内容 */
  value?: (props: { value: string | number | (string | number)[] }) => VNodeChild
  /** 无选项时的内容 */
  empty?: () => VNodeChild
}
