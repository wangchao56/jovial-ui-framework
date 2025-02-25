import type { Slot } from 'vue'

export const jvTimePickerProps = {
  /** 选中值 */
  modelValue: {
    type: String,
    default: '',
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 时间格式 */
  format: {
    type: String,
    default: 'HH:mm',
  },
  /** 最小时间 */
  minTime: String,
  /** 最大时间 */
  maxTime: String,
  /** 是否显示清除按钮 */
  allowClear: {
    type: Boolean,
    default: true,
  },
  /** 是否显示秒 */
  showSecond: {
    type: Boolean,
    default: true,
  },
  /** 小时制 24小时制 or 12小时制 */
  hourFormat: {
    type: String,
    default: '24',
  },
} as const

export type JvTimePickerProps = ExtractPropTypes<typeof jvTimePickerProps>

export interface JvTimePickerEmits {
  /** 选中值改变时触发 */
  (e: 'update:modelValue', value: string): void
  /** 选中值改变时触发 */
  (e: 'change', value: string): void
}

export interface JvTimePickerSlots {
  /** 自定义内容 */
  default?: Slot
}
export interface JvTimePickerExpose {
  /** 暴露的方法和属性 */
  root: Ref<HTMLElement>
  /** 打开时间选择器 */
  open: () => void
  /** 关闭时间选择器 */
  close: () => void
}
