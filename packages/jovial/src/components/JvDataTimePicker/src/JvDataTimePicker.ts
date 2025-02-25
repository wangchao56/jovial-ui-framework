export const jvDataTimePickerProps = {
  /**
   * 绑定值
   */
  modelValue: {
    type: [String, Number, Date] as PropType<string | number | Date>,
    default: '',
  },
  /**
   * 格式化日期时间
   */
  format: {
    type: String,
    default: 'YYYY-MM-DD HH:mm:ss',
  },
  /**
   * 占位符
   */
  placeholder: {
    type: String,
    default: '请选择日期时间',
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示清除按钮
   */
  clearable: {
    type: Boolean,
    default: true,
  },
  /**
   * 尺寸
   */
  size: {
    type: String as PropType<'large' | 'default' | 'small'>,
    default: 'default',
    validator: (value: string) => ['large', 'default', 'small'].includes(value),
  },
} as const

export type JvDataTimePickerProps = ExtractPropTypes<typeof jvDataTimePickerProps>

export interface JvDataTimePickerEmits {
  /**
   * 更新绑定值
   */
  (e: 'update:modelValue', value: string | number | Date): void
  /**
   * 改变
   */
  (e: 'change', value: string | number | Date): void
  /**
   * 聚焦
   */
  (e: 'focus', evt: FocusEvent): void
  /**
   * 失焦
   */
  (e: 'blur', evt: FocusEvent): void
  /**
   * 清除
   */
  (e: 'clear'): void
}

export interface JvDataTimePickerSlots {
  /**
   * 默认插槽
   */
  default?: () => any
  /**
   * 前缀插槽
   */
  prefix?: () => any
  /**
   * 后缀插槽
   */
  suffix?: () => any
}

export interface JvDataTimePickerExpose {
  /**
   * 聚焦
   */
  focus: () => void
  /**
   * 失焦
   */
  blur: () => void
}
