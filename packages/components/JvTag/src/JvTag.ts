import type { Shape, Size, Type } from '@jienix/typings'
import type { ExtractPropTypes, PropType, Ref, Slot } from 'vue'

// 标签变体 outlined, filled
type TagVariant = 'outlined' | 'filled'

export const typeSet = [
  'primary',
  'success',
  'warning',
  'error',
  'info',
  'default',
] as const
export const variantSet = [
  'text',
  'flat',
  'tonal',
  'plain',
  'elevated',
  'outlined',
] as const

export const jvTagProps = {
  /**
   * 标签文本
   */
  label: {
    type: String,
    default: '',
  },
  /**
   * 类型
   */
  type: {
    type: String as PropType<Type>,
    default: 'default',
  },

  /**
   * 尺寸
   */
  size: {
    type: String as PropType<Size>,
    default: 'medium',
  },
  /**
   * 形状
   */
  shape: {
    type: String as PropType<Shape>,
    default: 'square',
  },
  /**
   * 变体
   */
  variant: {
    type: String as PropType<TagVariant>,
    default: 'outlined',
  },
  /**
   * 是否可关闭
   */
  closable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否圆角
   */
  rounded: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示边框
   */
  border: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示图标
   */
  showIcon: {
    type: Boolean,
    default: false,
  },
  /**
   * 图标
   */
  icon: {
    type: String,
    default: '',
  },
} as const

export type JvTagProps = Partial<ExtractPropTypes<typeof jvTagProps>>

export interface JvTagEmits {
  /**
   * 关闭时触发
   */
  (event: 'close'): void
}

export interface JvTagSlots {
  /**
   * 默认插槽
   */
  default?: Slot
  /**
   * 图标插槽
   */
  icon?: Slot
}

export interface JvTagExpose {
  /**
   * 根元素
   */
  root: Ref<HTMLElement>
  /**
   * 关闭按钮
   */
  closeButton: Ref<HTMLElement>
}
