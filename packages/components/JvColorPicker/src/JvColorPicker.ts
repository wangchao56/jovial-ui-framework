export const jvColorPickerProps = {
  /** 选中值 */
  modelValue: {
    type: String,
    default: '#000000',
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 是否显示透明度 */
  showAlpha: {
    type: Boolean,
    default: false,
  },
  /** 颜色格式 */
  colorFormat: {
    type: String,
    default: 'hex',
    validator: (value: string) => ['hex', 'rgb', 'hsl'].includes(value),
  },
} as const

export type JvColorPickerProps = Partial<ExtractPropTypes<typeof jvColorPickerProps>>

export interface JvColorPickerEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}

export interface JvColorPickerSlots {
  default?: () => any
}

export interface JvColorPickerExpose {
  focus: () => void
  blur: () => void
}
