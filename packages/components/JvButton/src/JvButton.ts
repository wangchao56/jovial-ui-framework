import type { NativeType, Size, Type, Variant } from '@jienix/typings'
import type { VNodeChild } from 'vue'

export type Placement = 'left' | 'center' | 'right'

export const jvButtonProps = {
  /** 按钮类型 */
  type: {
    type: String as PropType<Type>,
    default: 'default',
  },
  /** 按钮宽度，可以是字符串或数字 */
  width: {
    type: [String, Number] as PropType<string | number>,
    default: 'auto',
  },
  /** 按钮大小 */
  size: {
    type: String as PropType<Size>,
    default: 'medium',
  },
  /** 是否禁用按钮 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 是否显示加载状态 */
  loading: {
    type: Boolean,
    default: false,
  },
  /** 是否为圆角按钮 */
  rounded: {
    type: Boolean,
    default: false,
  },
  /** 是否为虚线按钮 */
  dashed: {
    type: Boolean,
    default: false,
  },
  /** 是否为块级按钮 */
  block: {
    type: Boolean,
    default: false,
  },
  /** 是否为堆叠按钮 */
  stacked: {
    type: Boolean,
    default: false,
  },
  /** 按钮文本颜色 */
  color: {
    type: String,
    default: '',
  },
  /** 按钮背景颜色 */
  bgColor: {
    type: String,
    default: '',
  },
  /** 按钮变体 */
  variant: {
    type: String as PropType<Variant>,
    default: 'elevated',
  },
  /** 原生 type 属性 */
  nativeType: {
    type: String as PropType<NativeType>,
    default: 'button',
  },
  /** 原生 autofocus 属性 */
  autofocus: {
    type: Boolean,
    default: false,
  },
  /** 按钮的图标 */
  icon: {
    type: String,
    default: '',
  },
  /** 按钮的前置图标 */
  prependIcon: {
    type: String,
    default: '',
  },
  /** 按钮的后置图标 */
  appendIcon: {
    type: String,
    default: '',
  },
  /** 按钮的样式 */
  style: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({}),
  },
  /** 按钮的类名 */
  class: {
    type: String,
    default: '',
  },
} as const

export type JvButtonProps = ExtractPropTypes<typeof jvButtonProps>

/** 按钮的事件类型 */
export interface JvButtonEmits {
  /** 点击事件 */
  (e: 'click', payload: Event): void
  /** 鼠标按下事件 */
  (e: 'mousedown', payload: MouseEvent): void
  /** 键盘按下事件 */
  (e: 'keydown', payload: KeyboardEvent): void
  /** 键盘弹起事件 */
  (e: 'keyup', payload: KeyboardEvent): void
  /** 聚焦事件 */
  (e: 'focus', payload: FocusEvent): void
  /** 失焦事件 */
  (e: 'blur', payload: FocusEvent): void
}
/** 按钮的插槽类型 */
export interface JvButtonSlots {
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
export interface JvButtonExposed {
  /** 按钮的根元素 */
  root: Ref<HTMLButtonElement | null>
  /** 设置按钮的加载状态 */
  setLoading: (loading: boolean) => void
  /** 设置按钮的禁用状态 */
  setDisabled: (disabled: boolean) => void
}
