import type { Size } from '@jovial/typings'
import type { VNodeChild } from 'vue'

/** 按钮组上下文接口 */
export interface ButtonGroupContext {
  size?: Size
  rounded?: boolean
}

/** 按钮组属性接口 */
export interface ButtonGroupProps {
  /** 按钮组内所有按钮的尺寸 */
  size?: Size
  /** 是否垂直排列按钮 */
  vertical?: boolean
  /** 是否应用圆角样式 */
  rounded?: boolean
  /**
   * 按钮之间的间距
   * @example gap={8} // 8px
   * @example gap="1rem" // 1rem
   */
  gap?: number | string
  /**
   * 按钮的水平对齐方式
   * @default 'start'
   */
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around'
}

/** 按钮组插槽接口 */
export interface ButtonGroupSlots {
  /** 默认插槽，用于放置按钮 */
  default?: () => VNodeChild
}

/** 按钮组暴露的方法和属性 */
export interface ButtonGroupExpose {
  /** 按钮组根元素 */
  root: HTMLElement | null
}
