import type { NativeType, Size, Type, Variant } from '@jovial/typings'
import type { VNodeChild } from 'vue'

export type Placement = 'left' | 'center' | 'right'

export interface ButtonProps {
  /** 按钮类型 */
  type?: Type
  /** 按钮宽度，可以是字符串或数字 */
  width?: string | number
  /** 按钮大小 */
  size?: Size
  /** 是否禁用按钮 */
  disabled?: boolean
  /** 是否显示加载状态 */
  loading?: boolean
  /** 是否为圆角按钮 */
  rounded?: boolean
  /** 是否为虚线按钮 */
  dashed?: boolean
  /** 是否为块级按钮 */
  block?: boolean
  /** 是否为堆叠按钮 */
  stacked?: boolean
  /** 按钮颜色 */
  color?: string
  /** 按钮背景颜色 */
  bgColor?: string
  /** 按钮变体 */
  variant?: Variant
  /** 原生 type 属性 */
  nativeType?: NativeType
  /** 原生 autofocus 属性 */
  autofocus?: boolean
}
/** 按钮的事件类型 */
export interface ButtonEmits {
  /** 点击事件 */
  (e: 'click', payload: MouseEvent): void
  /** 鼠标按下事件 */
  (e: 'mousedown', payload: MouseEvent): void
  /** 键盘按下事件 */
  (e: 'keydown', payload: KeyboardEvent): void
}
/** 按钮的插槽类型 */
export interface ButtonSlots {
  /** 默认插槽 */
  default?: () => VNodeChild
  /** 加载状态插槽 */
  loading?: () => VNodeChild
  /** 前置插槽 */
  prepend?: () => VNodeChild
  /** 后置插槽 */
  append?: () => VNodeChild
}
/** 按钮的暴露类型 */
export interface ButtonExposed {
  /** 按钮的根元素 */
  root: HTMLButtonElement | null
  /** 设置按钮的加载状态 */
  setLoading: (loading: boolean) => void
  /** 设置按钮的禁用状态 */
  setDisabled: (disabled: boolean) => void
}
