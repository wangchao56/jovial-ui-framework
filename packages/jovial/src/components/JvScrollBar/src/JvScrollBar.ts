import type { Slot } from 'vue'

export const jvScrollBarProps = {
  /**
   * 高度
   */
  height: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  /**
   * 最大高度
   */
  maxHeight: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  /**
   * 是否使用原生滚动
   */
  native: {
    type: Boolean,
    default: false,
  },
  /**
   * 包装器样式
   */
  wrapStyle: {
    type: [String, Object] as PropType<string | Record<string, any>>,
    default: '',
  },
  /**
   * 包装器类名
   */
  wrapClass: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  /**
   * 视图样式
   */
  viewStyle: {
    type: [String, Object] as PropType<string | Record<string, any>>,
    default: '',
  },
  /**
   * 视图类名
   */
  viewClass: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  /**
   * 是否禁止调整大小
   */
  noresize: {
    type: Boolean,
    default: false,
  },
  /**
   * 标签名
   */
  tag: {
    type: String,
    default: 'div',
  },
  /**
   * 是否总是显示滚动条
   */
  always: {
    type: Boolean,
    default: false,
  },
  /**
   * 最小尺寸
   */
  minSize: {
    type: Number,
    default: 20,
  },
  /**
   * 是否可交互
   */
  interactive: {
    type: Boolean,
    default: true,
  },
  /**
   * 滚动条轨道是否可点击
   */
  trackClickable: {
    type: Boolean,
    default: true,
  },
} as const

export type JvScrollBarProps = ExtractPropTypes<typeof jvScrollBarProps>

export interface JvScrollBarEmits {
  /**
   * 滚动事件
   */
  (e: 'scroll', args: {
    scrollTop: number
    scrollLeft: number
  }): void
}

export interface JvScrollBarSlots {
  /**
   * 默认插槽
   */
  default?: Slot
}

export interface JvScrollBarExpose {
  /**
   * 包装器引用
   */
  wrapRef: HTMLElement
  /**
   * 更新
   */
  update: () => void
  /**
   * 滚动到指定位置
   */
  scrollTo: (options: ScrollToOptions) => void
  /**
   * 设置滚动位置
   */
  setScrollTop: (scrollTop: number) => void
  /**
   * 设置滚动位置
   */
  setScrollLeft: (scrollLeft: number) => void
}
