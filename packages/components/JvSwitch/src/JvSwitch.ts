import type { Size } from '@jienix/typings'
import type { ExtractPropTypes, PropType } from 'vue'

export const switchSize = [
  'tiny',
  'small',
  'medium',
  'large',
  'x-large',
] as const

export const jvSwitchProps = {
  /**
   * 开关的值
   */
  modelValue: {
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
   * 是否处于加载状态
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * 开关大小
   */
  size: {
    type: String as PropType<Size>,
    default: 'medium',
  },
}

export type JvSwitchProps = ExtractPropTypes<typeof jvSwitchProps>

export interface JvSwitchEmits {
  /**
   * 更新绑定值
   */
  (e: 'update:modelValue', value: boolean): void
  /**
   * 改变时触发
   */
  (e: 'change', value: boolean): void
  /**
   * 点击时触发
   */
  (e: 'click', event: MouseEvent): void
}

export interface JvSwitchSlots {}
export interface JvSwitchExpose {}
