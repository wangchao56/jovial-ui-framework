import type { Size } from '@jienix/typings'
import type { InputHTMLAttributes, VNodeChild } from 'vue'

export interface InputProps {
  /** 输入框类型 */
  type?: 'text' | 'password' | 'textarea'
  /** 默认值 */
  defaultValue?: string | [string, string] | null
  /** 占位符 */
  placeholder?: string
  /** 绑定值 */
  modelValue?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只读 */
  readonly?: boolean
  /** 是否可清除 */
  clearable?: boolean
  /** 是否显示密码 */
  showPassword?: boolean
  /** 是否显示字数限制 */
  showWordLimit?: boolean
  /** 最大长度 */
  maxlength?: number
  /** 最小长度 */
  minlength?: number
  /** 是否自动聚焦 */
  autofocus?: boolean
  /** 自动调整大小 */
  autosize?: boolean | { minRows: number, maxRows: number }
  /** 是否成对输入 */
  pair?: boolean
  /** 行数 */
  rows?: number
  /** 是否圆角 */
  round?: boolean
  /** 成对输入框中间的分隔符 */
  separator?: string
  /** 是否显示输入字数统计 */
  showCount?: boolean
  /** 输入框尺寸 */
  size?: Exclude<Size, 'x-large'>
  /** 验证状态 */
  status?: 'success' | 'warning' | 'error'
  /** 输入框的值 */
  value?: string | [string, string]
  /** 输入框的原生属性 */
  inputProps?: InputHTMLAttributes
}

/***
 * InputEmits 定义了输入组件的事件。
 */
export interface InputEmits {
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
export interface InputSlots {
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
export interface InputExposes {
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
