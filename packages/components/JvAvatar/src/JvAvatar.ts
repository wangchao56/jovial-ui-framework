import type { Size } from '@jienix/typings'
import type { PropType, Slot } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

export type AvatarShape = 'circle' | 'square'
export type AvatarFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
export const avatarSizes = ['tiny', 'small', 'medium', 'large', 'x-large'] as const

export const jvAvatarProps = {
  /** 头像图片地址 */
  src: {
    type: String,
    default: '',
  },
  /** 头像图片的替代文本 */
  alt: {
    type: String,
    default: 'avatar',
  },
  /** 头像文字 */
  text: {
    type: String,
    default: '',
  },
  /** 头像图标 */
  icon: {
    type: String,
    default: '',
  },
  /** 头像尺寸 */
  size: {
    type: String as PropType<Size>,
    default: 'medium',
    validator: (value: string) =>
      avatarSizes.includes(value as Size),
  },
  /** 头像尺寸 */
  customSize: {
    type: Number,
    default: 40,
  },
  /** 图片适应方式 */
  fit: {
    type: String as PropType<AvatarFit>,
    default: 'cover',
    validator: (value: string) =>
      ['fill', 'contain', 'cover', 'none', 'scale-down'].includes(value),
  },
  /** 头像形状 */
  shape: {
    type: String as PropType<AvatarShape>,
    default: 'circle',
    validator: (value: string) =>
      ['circle', 'rounded', 'square'].includes(value),
  },
  /** 头像颜色 */
  color: {
    type: String,
    default: '',
  },
  /** 头像背景颜色 */
  bgColor: {
    type: String,
    default: '',
  },
  /** 头像文字颜色 */
  textColor: {
    type: String,
    default: '',
  },
  /** 是否显示边框 */
  bordered: {
    type: Boolean,
    default: false,
  },
  /** 是否可点击 */
  clickable: {
    type: Boolean,
    default: false,
  },
  /** 图片加载失败时显示的文本 */
  fallbackText: {
    type: String,
    default: '',
  },
  /** 点击头像后的跳转链接 */
  to: {
    type: [String, Object] as PropType<RouteLocationRaw>,
    default: null,
  },
} as const

export type JvAvatarProps = ExtractPropTypes<typeof jvAvatarProps>

export const jvAvatarEmits = {
  /** 图片加载错误时触发 */
  error: (evt: Event) => evt instanceof Event,
} as const

export interface JvAvatarEmits {
  /** 图片加载错误时触发 */
  (event: 'error', evt: Event): void
  /** 点击头像 */
  (event: 'click', evt: MouseEvent): void
}

export interface JvAvatarSlots {
  /** 自定义头像内容 */
  default?: Slot
  /** 自定义图标 */
  icon?: Slot
}

export interface JvAvatarExpose {
  /** 头像根元素 */
  root: HTMLElement | null
}
