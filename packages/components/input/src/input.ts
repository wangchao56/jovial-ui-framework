import { EmitsOptions, InputHTMLAttributes, VNodeChild } from 'vue'
import { Size } from '../../button'

export const inputProps = {} as const

export interface InputPropsType {
  defaultValue?: string | [string, string] | null
  placeholder?: string
  modelValue?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  showPassword?: boolean
  showWordLimit?: boolean
  maxlength?: number
  minlength?: number
  autofocus?: boolean
  autosize?: boolean | { minRows: number; maxRows: number }
  pair?: boolean
  rows?: number
  round?: boolean
  /**成对输入框中间的分隔符 */
  separator?: string
  /**是否显示输入字数统计 */
  showCount?: boolean
  /**输入框尺寸 */
  size?: Exclude<Size, 'x-large'>
  /**验证状态 */
  status?: 'success' | 'warning' | 'error'
  type?: 'text' | 'password' | 'textarea'
  value?: string | [string, string]
  inputProps?: InputHTMLAttributes
}

export type InputEmits = {
  (e: 'update:modelValue', value: string): void
  (e: 'update:disabled', value: boolean): void
  (e: 'update:readonly', value: boolean): void
  (e: 'blur'): void
  (e: 'focus'): void
  (e: 'change', value: string | [string, string]): void
  (e: 'input', value: string | [string, string]): void
  (e: 'keydown', value: KeyboardEvent): void
}

export const inputEmits: EmitsOptions = {
  'update:modelValue': (value: string) => value !== '',
  'update:disabled': (value: boolean) => value !== true,
  'update:readonly': (value: boolean) => value !== true
}

export type InputSlots = {
  default: (() => VNodeChild) | undefined
  prefix: (() => VNodeChild) | undefined
  suffix: (() => VNodeChild) | undefined
  prepend: (() => VNodeChild) | undefined
  append: (() => VNodeChild) | undefined
}

export type InputExposes = {
  focus: () => void
  blur: () => void
  clear: () => void
  scrollTo: (options: {
    left?: number
    top?: number
    behavior?: 'auto' | 'smooth'
  }) => void
  select: () => void
}
