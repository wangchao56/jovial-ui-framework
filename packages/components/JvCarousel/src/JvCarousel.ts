import type { Slot } from 'vue'

/** 轮播方向 */
export type CarouselDirection = 'horizontal' | 'vertical'

/** 切换动画 */
export type CarouselEffect = 'slide' | 'fade'

/** 指示器位置 */
export type CarouselIndicatorPosition = 'inside' | 'outside' | 'none'

export const jvCarouselProps = {
  /** 当前激活项 */
  modelValue: {
    type: Number,
    default: 0,
  },
  /** 是否自动播放 */
  autoplay: {
    type: Boolean,
    default: true,
  },
  /** 自动播放间隔 */
  interval: {
    type: Number,
    default: 3000,
  },
  /** 轮播方向 */
  direction: {
    type: String as () => CarouselDirection,
    default: 'horizontal',
  },
  /** 切换动画 */
  effect: {
    type: String as () => CarouselEffect,
    default: 'slide',
  },
  /** 指示器位置 */
  indicatorPosition: {
    type: String as () => CarouselIndicatorPosition,
    default: 'inside',
  },
  /** 是否显示箭头 */
  arrow: {
    type: Boolean,
    default: true,
  },
  /** 切换动画时长 */
  duration: {
    type: Number,
    default: 300,
  },
  /** 是否循环播放 */
  loop: {
    type: Boolean,
    default: true,
  },
  /** 是否暂停自动播放 */
  pauseOnHover: {
    type: Boolean,
    default: true,
  },
} as const

export type JvCarouselProps = ExtractPropTypes<typeof jvCarouselProps>

export const jvCarouselEmits = {
  /** 切换时触发 */
  'update:modelValue': (index: number) => typeof index === 'number',
  /** 切换时触发 */
  'change': (index: number) => typeof index === 'number',
} as const

export interface JvCarouselEmits {
  /** 切换时触发 */
  (e: 'update:modelValue', index: number): void
  /** 切换时触发 */
  (e: 'change', index: number): void
}

export interface JvCarouselSlots {
  /** 轮播内容 */
  default?: Slot
  /** 自定义指示器 */
  indicator?: Slot<{ key: PropertyKey, index: number, active: boolean }>
  /** 自定义箭头 */
  arrow?: Slot<{ key: PropertyKey, prev: () => void, next: () => void }>
}

export interface JvCarouselExpose {
  /** 切换到上一项 */
  prev: () => void
  /** 切换到下一项 */
  next: () => void
  /** 切换到指定项 */
  goto: (index: number) => void
}
