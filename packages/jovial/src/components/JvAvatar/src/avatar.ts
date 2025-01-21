import type { Size } from '@jovial/typings'
import type { VNodeChild } from 'vue'

export type AvatarShape = 'circle' | 'square'
export type AvatarFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

export const jvAvatarProps = {
  /** 头像大小 */
  size: {
    type: [String, Number] as unknown as () => Size | number,
    default: 'medium',
  },
  /** 头像形状 */
  shape: {
    type: String as () => AvatarShape,
    default: 'circle',
  },
  /** 图片源地址 */
  src: {
    type: String,
    default: '',
  },
  /** 图片适应容器的方式 */
  fit: {
    type: String as () => AvatarFit,
    default: 'cover',
  },
  /** 图标名称 */
  icon: {
    type: String,
    default: '',
  },
  /** 图标大小 */
  iconSize: {
    type: [String, Number],
    default: '',
  },
  /** 图标颜色 */
  iconColor: {
    type: String,
    default: '',
  },
  /** 文字内容 */
  text: {
    type: String,
    default: '',
  },
  /** 背景颜色 */
  bgColor: {
    type: String,
    default: '',
  },
  /** 文字颜色 */
  color: {
    type: String,
    default: '',
  },
  /** 是否显示边框 */
  bordered: {
    type: Boolean,
    default: false,
  },
  /** 加载失败时的文字 */
  fallbackText: {
    type: String,
    default: '',
  },
} as const

export interface JvAvatarProps {
  size?: Size | number
  shape?: AvatarShape
  src?: string
  fit?: AvatarFit
  icon?: string
  iconSize?: string | number
  iconColor?: string
  text?: string
  bgColor?: string
  color?: string
  bordered?: boolean
  fallbackText?: string
}

export const jvAvatarEmits = {
  /** 图片加载错误时触发 */
  error: (evt: Event) => evt instanceof Event,
} as const

export interface JvAvatarEmits {
  /** 图片加载错误时触发 */
  (e: 'error', evt: Event): void
}

export const jvAvatarSlots = {
  /** 自定义头像内容 */
  default: {},
  /** 自定义图标 */
  icon: {},
} as const

export interface JvAvatarSlots {
  default?: () => VNodeChild
  icon?: () => VNodeChild
}

export interface JvAvatarExpose {
  /** 头像根元素 */
  root: HTMLElement | null
}
