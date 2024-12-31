import type { ExtractPropTypes, PropType, VNodeChild } from 'vue'

export type Type =
  | 'default'
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
export type Variant =
  | 'text'
  | 'flat'
  | 'tonal'
  | 'plain'
  | 'elevated'
  | 'outlined'
export type Size = 'tiny' | 'small' | 'medium' | 'large' | 'x-large'
export enum SizeOptions {
  'TINY' = 'tiny',
  'SMALL' = 'small',
  'MEDIUM' = 'medium',
  'LARGE' = 'large',
  'X-LARGE' = 'x-large'
}

export type Placement = 'left' | 'center' | 'right'
/**按钮的 DOM 的 type 属性 */
export type NativeType = 'button' | 'submit' | 'reset'

export const buttonProps = {
  type: {
    type: String as PropType<Type>,
    default: 'default'
  },
  width: {
    type: [String, Number] as PropType<string | number>,
    default: '100%'
  },
  size: {
    type: String as PropType<Size>,
    default: 'medium'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  /** 图标 */
  // icon: {
  //   type: String,
  //   default: ''
  // },
  // prependIcon: {
  //   type: String,
  //   default: ''
  // },
  // appendIcon: {
  //   type: String,
  //   default: ''
  // },
  rounded: {
    type: Boolean,
    default: false
  },
  dashed: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  stacked: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: ''
  },
  bgColor: {
    type: String,
    default: ''
  },
  variant: {
    type: String as PropType<Variant>,
    default: 'elevated'
  },
  /** 原生 type 属性 */
  nativeType: {
    type: String as PropType<NativeType>,
    default: 'button'
  },
  /** 原生 autofocus 属性 */
  autofocus: {
    type: Boolean,
    default: false
  }
} as const

export const buttonEmits = {
  click: (e: MouseEvent) => e instanceof MouseEvent,
  mousedown: (e: MouseEvent) => e instanceof MouseEvent,
  keydown: (e: KeyboardEvent) => e instanceof MouseEvent
} as const

export type ButtonSlots = {
  default: ((...args: any[]) => any) | undefined
  loading: (() => VNodeChild) | undefined
  prepend: (() => VNodeChild) | undefined
  append: (() => VNodeChild) | undefined
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = {
  (e: 'click', payload: MouseEvent): boolean
  (e: 'mousedown', payload: MouseEvent): boolean
  (e: 'keydown', payload: MouseEvent): boolean
}
