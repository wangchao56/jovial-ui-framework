import type { ComponentPublicInstance, PropType } from 'vue'

export const jvAffixProps = {
  /** 距离窗口顶部或底部的偏移量 */
  offset: {
    type: Number,
    default: 0,
  },
  /** 固定的位置，可选值为 top、bottom */
  position: {
    type: String as PropType<'top' | 'bottom'>,
    default: 'top',
  },
  /** 设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 */
  target: {
    type: Function as PropType<() => HTMLElement | null | Window>,
    default: () => window,
  },
  /** z-index 值 */
  zIndex: {
    type: Number,
    default: 100,
  },
  /** 主题 */
  theme: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light',
  },
  /** 是否启用固钉功能 */
  enabled: {
    type: Boolean,
    default: true,
  },
  /** 自定义类名 */
  customClass: {
    type: String,
    default: '',
  },
  /** 滚动容器的外边距，影响固钉触发条件 */
  targetMargin: {
    type: Number,
    default: 0,
  },
} as const

export type JvAffixProps = ExtractPropTypes<typeof jvAffixProps>

export interface JvAffixEmits {
  /** 固定状态改变时触发 */
  (e: 'change', fixed: boolean): void
  /** 滚动时触发 */
  (e: 'scroll', data: { scrollTop: number, fixed: boolean }): void
  /** 组件初始化完成时触发 */
  (e: 'ready'): void
}

export interface JvAffixSlots {
  default?: () => any
}

export interface JvAffixExpose {
  /** 更新固钉状态 */
  update: () => void
  /** 获取固钉当前状态 */
  getFixed: () => boolean
  /** 手动设置固钉状态 */
  setFixed: (value: boolean) => void
  /** 获取当前滚动容器 */
  getScrollTarget: () => HTMLElement | Window | null
}

// 添加类型声明
export type JvAffixInstance = ComponentPublicInstance & JvAffixExpose
