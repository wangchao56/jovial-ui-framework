import type { Size, Type } from '@jienix/typings'
import type { ExtractPropTypes, PropType, Ref, Slot } from 'vue'
// import { propsFactory } from '@jienix/utils'

export const jvTagProps = {
  /**
   * 类型
   */
  type: {
    type: String as PropType<Type>,
    default: 'primary',
  },
  /**
   * 尺寸
   */
  size: {
    type: String as PropType<Size>,
    default: 'medium',
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
    default: true,
  },
  /**
   * 图标
   */
  icon: {
    type: String,
    default: '',
  },
} as const

export type JvTagProps = ExtractPropTypes<typeof jvTagProps>

export interface JvTagEmits {
  (event: 'close', evt: MouseEvent): void
}

export interface JvTagSlots {
  default?: Slot
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
