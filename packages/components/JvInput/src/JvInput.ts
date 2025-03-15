import type { ExtractPropTypes, VNodeChild } from 'vue'

export const jvInputProps = {
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<'text' | 'password' >,
    default: 'text',
  },
  variant: {
    type: String as PropType<'outlined' | 'filled' | 'underlined'>,
    default: 'outlined',
    validator: (value: string) =>
      ['outlined', 'filled', 'underlined'].includes(value),
  },
  id: {
    type: String,
    default: () => `jv-input-${Math.random().toString(36).substring(2, 9)}`,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  success: {
    type: String,
    default: '',
  },
  hint: {
    type: String,
    default: '',
  },
  prefix: {
    type: String,
    default: '',
  },
  suffix: {
    type: String,
    default: '',
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  dense: {
    type: Boolean,
    default: false,
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  min: {
    type: [Number, String] as PropType<number | string>,
    default: undefined,
  },
  max: {
    type: [Number, String] as PropType<number | string>,
    default: undefined,
  },
  step: {
    type: [Number, String] as PropType<number | string>,
    default: undefined,
  },
  maxlength: {
    type: [Number, String] as PropType<number | string>,
    default: undefined,
  },
  // 边框涟漪相关属性
  borderRipple: {
    type: Boolean,
    default: true,
  },
  borderRippleColor: {
    type: String,
    default: '',
  },
  borderRippleDuration: {
    type: Number,
    default: 800,
  },
  borderRippleWidth: {
    type: Number,
    default: 2,
  },
} as const

export type JvInputProps = ExtractPropTypes<typeof jvInputProps>
/***
 * InputEmits 定义了输入组件的事件。
 */
export interface JvInputEmits {
  /** 更新绑定值事件 */
  (e: 'update:modelValue', value: string): void
  /** 更新禁用状态事件 */
  (e: 'update:disabled', value: boolean): void
  /** 更新只读状态事件 */
  (e: 'update:readonly', value: boolean): void
  /** 失焦事件 */
  (e: 'blur', payload: FocusEvent): void
  /** 聚焦事件 */
  (e: 'focus', payload: FocusEvent): void
  /** 值改变事件 */
  (e: 'change', value: string | [string, string]): void
  /** 输入事件 */
  (e: 'input', value: string | [string, string]): void
  /** 键盘按下事件 */
  (e: 'keydown', value: KeyboardEvent): void
  /** 错误事件 */
  (e: 'error', error: any): void
}

/***
 * InputSlots 定义了输入组件的插槽。
 */
export interface JvInputSlots {
  /** 默认插槽 */
  default: (() => VNodeChild) | undefined
  /** 前缀插槽 */
  prefix: (() => VNodeChild) | undefined
  /** 后缀插槽 */
  suffix: (() => VNodeChild) | undefined
  /** 前置插槽 */
  prepend: (() => VNodeChild) | undefined
  /** 后置插槽 */
  append: (() => VNodeChild) | (() => string) | undefined
}

/***
 * InputExposes 定义了输入组件的公开方法。
 */
export interface JvInputExposes {
  /** 聚焦方法 */
  focus: () => void
  /** 失焦方法 */
  blur: () => void
  /** 清除方法 */
  clear: () => void
  /** 滚动到指定位置方法 */
  scrollTo: (options: {
    left?: number
    top?: number
    behavior?: 'auto' | 'smooth'
  }) => void
  /** 选择文本方法 */
  select: () => void
}
