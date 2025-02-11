export const jvTimePickerProps = {
  modelValue: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  format: {
    type: String,
    default: 'HH:mm',
  },
  minTime: String,
  maxTime: String,
  allowClear: {
    type: Boolean,
    default: true,
  },
  // 是否显示秒
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

export interface JvTimePickerProps {
  modelValue?: string
  disabled?: boolean
  format?: string
  minTime?: string
  maxTime?: string
  allowClear?: boolean
  showSecond?: boolean
  hourFormat?: string
}

export interface JvTimePickerEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}

export interface JvTimePickerSlots {
  // 插槽定义
  default?: () => any
}
export interface JvTimePickerExpose {
  // 暴露的方法和属性
}
