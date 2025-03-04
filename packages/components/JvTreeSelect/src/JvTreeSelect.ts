import type { TreeOptions } from '@components/JvTree'
import type { ExtractPropTypes, PropType, Ref, Slot } from 'vue'

export const jvTreeSelectProps = {
  /** 选中值 */
  modelValue: {
    type: [String, Number, Array] as PropType<
      string | number | (string | number)[]
    >,
    default: '',
  },
  /** 选项数据 */
  data: {
    type: Array as PropType<TreeOptions[]>,
    default: () => [],
  },
  /** 是否多选 */
  multiple: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 是否显示清除按钮 */
  clearable: {
    type: Boolean,
    default: false,
  },
  /** 占位文本 */
  placeholder: {
    type: String,
    default: '请选择',
  },
  /** 选项值的键名 */
  valueKey: {
    type: String,
    default: 'id',
  },
  /** 选项标签的键名 */
  labelKey: {
    type: String,
    default: 'label',
  },
  /** 子选项的键名 */
  childrenKey: {
    type: String,
    default: 'children',
  },
} as const

export type JvTreeSelectProps = ExtractPropTypes<typeof jvTreeSelectProps>

export interface JvTreeSelectEmits {
  /** 清空选项时触发 */
  (e: 'clear'): void
  /** 选中值改变时触发 */
  (e: 'change', value: string | number | (string | number)[]): void
  /** 选中值改变时触发 */
  (e: 'update:modelValue', value: string | number | (string | number)[]): void
  /** 下拉框显示状态改变时触发 */
  (e: 'visibleChange', visible: boolean): void
}

export interface JvTreeSelectSlots {
  /** 自定义选项内容 */
  default?: Slot
}

export interface JvTreeSelectExpose {
  /** 根元素 */
  root: Ref<HTMLElement>
  /** 清除选项 */
  clear: () => void
  /** 打开下拉框 */
  open: () => void
  /** 关闭下拉框 */
  close: () => void
  /** 设置选中值 */
  setValue: (value: string | number | (string | number)[]) => void
  /** 获取选中值 */
  getValue: () => string | number | (string | number)[]
  /** 获取选项数据 */
  getOptions: () => TreeOptions[]
}
