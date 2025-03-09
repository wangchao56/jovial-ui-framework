export const jvInputNumberProps = {
  modelValue: {
    type: [Number, String] as PropType<number | string>,
    default: 0,
  },
  min: {
    type: Number,
    default: -Infinity,
  },
  max: {
    type: Number,
    default: Infinity,
  },
  step: {
    type: Number,
    default: 1,
  },
  stepStrictly: {
    type: Boolean,
    default: false,
  },
  precision: {
    type: Number,
    validator: (val: number) =>
      val >= 0 && val === Number.parseInt(val.toString(), 10),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  controls: {
    type: Boolean,
    default: true,
  },
  controlsPosition: {
    type: String,
    default: 'default',
    validator: (val: string) => ['default', 'right'].includes(val),
  },
  name: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  helperText: {
    type: String,
    default: '',
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorText: {
    type: String,
    default: '',
  },
  success: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'default',
    validator: (val: string) => ['small', 'default', 'large'].includes(val),
  },
} as const

export type JvInputNumberProps = ExtractPropTypes<typeof jvInputNumberProps>

export interface JvInputNumberEmits {
  // 事件定义
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
  (e: 'clear'): void
  (e: 'input', event: Event): void
}
export interface JvInputNumberSlots {
  // 插槽定义
  default?: () => any
}
export interface JvInputNumberExpose {
  // 暴露的方法和属性
  increment: () => void
  decrement: () => void
  clear: () => void
  focus: () => void
  blur: () => void
  input: (event: Event) => void
}
