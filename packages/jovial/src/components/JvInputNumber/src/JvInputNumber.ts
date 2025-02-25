export const jvInputNumberProps = {
  modelValue: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  precision: {
    type: Number,
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
} as const
export interface JvInputNumberProps {
  // 组件属性定义
  modelValue: number
  min: number
  max: number
  step: number
  precision: number
  disabled: boolean
  readonly: boolean
};
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
