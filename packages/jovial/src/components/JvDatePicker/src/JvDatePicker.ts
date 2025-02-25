import type { ExtractPropTypes, Slot } from 'vue'

export const jvDatePickerProps = {
  /** 选中值 */
  modelValue: {
    type: [Date, String, Number] as PropType<Date | string | number | undefined>,
    default: undefined,
  },
  /** 占位文本 */
  placeholder: {
    type: String,
    default: '请选择日期',
  },
  /** 格式化日期 */
  format: {
    type: String,
    default: 'YYYY-MM-DD',
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 是否可清除 */
  clearable: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
} as const

export type JvDatePickerProps = ExtractPropTypes<typeof jvDatePickerProps>

export interface JvDatePickerEmits {
  /** 选中值改变时触发 */
  (e: 'update:modelValue', value: Date | string | number | undefined | null): void
  /** 选中值改变时触发 */
  (e: 'change', value: Date | string | number | undefined | null): void
  /** 清除时触发 */
  (e: 'clear'): void
}

export interface JvDatePickerSlots {
  /** 自定义内容 */
  default?: Slot
  /** 前缀 */
  prefix?: Slot
  /** 后缀 */
  suffix?: Slot
}

export interface JvDatePickerExpose {
  /** 根元素 */
  root: Ref<HTMLElement>
  /** 聚焦 */
  focus: () => void
  /** 失焦 */
  blur: () => void
}
