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
    type: [String, Number, Array] as PropType<string | number | (string | number)[]>,
    default: '',
  },
  /** 选项列表 */
  options: {
    type: Array as PropType<SelectOption[]>,
    default: () => [],
  },
  /** 占位文本 */
  placeholder: {
    type: String as PropType<string>,
    default: '请选择',
  },
  /** 是否多选 */
  multiple: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 是否可清空 */
  clearable: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 是否可搜索 */
  filterable: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 下拉框宽度 */
  dropdownWidth: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  /** 最大显示标签数 */
  maxTagCount: {
    type: Number as PropType<number>,
    default: 0,
  },
} as const

export type JvSelectProps = Partial<ExtractPropTypes<typeof jvSelectProps>>

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

export interface JvSelectExpose {
  // 暴露的方法和属性
  root: Ref<HTMLElement>
  /** 打开下拉框 */
  open: () => void
  /** 关闭下拉框 */
  close: () => void
  /** 设置选中值 */
  setValue: (value: string | number | (string | number)[]) => void
  /** 获取选中值 */
  getValue: () => string | number | (string | number)[]
  /** 获取选项列表 */
  getOptions: () => SelectOption[]
  /** 获取选中值的选项 */
  getSelectedOptions: () => SelectOption[]
}
