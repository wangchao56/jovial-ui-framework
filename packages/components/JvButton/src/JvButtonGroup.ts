import type { Size } from '@jienix/typings'
import type { VNodeChild } from 'vue'

/** 按钮组上下文接口 */
export interface JvButtonGroupContext {
  size?: Size
  rounded?: boolean
}
export const jvButtonGroupProps = {
  /** 按钮组内所有按钮的尺寸 */
  size: {
    type: String as PropType<Size>,
    default: 'medium',
    required: false,
  },
  /** 是否垂直排列按钮 */
  vertical: {
    type: Boolean,
    default: false,
    required: false,
  },
  /** 是否应用圆角样式 */
  rounded: {
    type: Boolean,
    default: false,
    required: false,
  },
  /** 按钮之间的间距 */
  gap: {
    type: [Number, String] as PropType<number | string>,
    default: 0,
    required: false,
  },
  /** 按钮的水平对齐方式 */
  justify: {
    type: String as PropType<'start' | 'center' | 'end' | 'space-between' | 'space-around'>,
    default: 'start',
    required: false,
  },
} as const

export type JvButtonGroupProps = ExtractPropTypes<typeof jvButtonGroupProps>

/** 按钮组插槽接口 */
export interface JvButtonGroupSlots {
  /** 默认插槽，用于放置按钮 */
  default?: () => VNodeChild
}

/** 按钮组暴露的方法和属性 */
export interface JvButtonGroupExpose {
  /** 按钮组根元素 */
  root: HTMLElement | null
}

export const JvButtonGroupContextKey: InjectionKey<JvButtonGroupContext> = Symbol('JvButtonGroupContextKey')
