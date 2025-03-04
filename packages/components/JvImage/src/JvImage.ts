import type { VNodeChild } from 'vue'

export interface ImageSource {
  /** 图片源地址 */
  src: string
  /** 媒体查询条件 */
  media?: string
  /** 图片类型 */
  type?: string
}

export const jvImageProps = {
  /** 图片源地址 */
  src: {
    type: String,
    default: '',
  },
  /** 响应式图片源列表 */
  sources: {
    type: Array as () => ImageSource[],
    default: () => [],
  },
  /** 图片适应容器的方式 */
  fit: {
    type: String as () => 'fill' | 'contain' | 'cover' | 'none' | 'scale-down',
    default: 'fill',
  },
  /** 图片 alt 属性 */
  alt: {
    type: String,
    default: '',
  },
  /** 是否懒加载 */
  lazy: {
    type: Boolean,
    default: false,
  },
  /** 图片加载失败时的占位图 */
  fallback: {
    type: String,
    default: '',
  },
  /** 图片预览时的 URL，为空则使用 src */
  previewSrc: {
    type: String,
    default: '',
  },
  /** 是否可预览 */
  preview: {
    type: Boolean,
    default: false,
  },
  /** 加载中的占位图 */
  placeholder: {
    type: String,
    default: '',
  },
  /** 是否隐藏加载错误提示 */
  hideOnError: {
    type: Boolean,
    default: false,
  },
  /** 图片宽度 */
  width: {
    type: [String, Number],
    default: '',
  },
  /** 图片高度 */
  height: {
    type: [String, Number],
    default: '',
  },
  /** 图片圆角 */
  radius: {
    type: [String, Number],
    default: 0,
  },
} as const

export interface JvImageProps {
  src?: string
  sources?: ImageSource[]
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  alt?: string
  lazy?: boolean
  fallback?: string
  previewSrc?: string
  preview?: boolean
  placeholder?: string
  hideOnError?: boolean
  width?: string | number
  height?: string | number
  radius?: string | number
}

export const jvImageEmits = {
  /** 图片加载成功时触发 */
  load: (evt: Event) => evt instanceof Event,
  /** 图片加载失败时触发 */
  error: (evt: Event) => evt instanceof Event,
  /** 点击图片时触发 */
  click: (evt: MouseEvent) => evt instanceof Event,
} as const

export interface JvImageEmits {
  load: (evt: Event) => void
  error: (evt: Event) => void
  click: (evt: MouseEvent) => void
}

export const jvImageSlots = {
  /** 自定义加载中内容 */
  placeholder: {},
  /** 自定义加载失败内容 */
  error: {},
  /** 自定义图片预览内容 */
  preview: {},
} as const

export interface JvImageSlots {
  placeholder?: () => VNodeChild
  error?: () => VNodeChild
  preview?: () => VNodeChild
}

export interface JvImageExpose {
  /** 图片根元素 */
  root: HTMLElement | null
}
