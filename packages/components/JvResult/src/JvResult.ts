import type { Slot } from 'vue'

export type ResultStatus = 'success' | 'error' | 'info' | 'warning'

export const jvResultProps = {
  /** 标题 */
  title: {
    type: String,
    default: '',
  },
  /** 副标题 */
  subTitle: {
    type: String,
    default: '',
  },
  /** 状态 */
  status: {
    type: String as PropType<ResultStatus>,
    default: 'info',
  },
  /** 图标 */
  icon: {
    type: String as PropType<string>,
    default: '',
  },
} as const

export type JvResultProps = ExtractPropTypes<typeof jvResultProps>

export interface JvResultEmits {
  /** 点击事件 */
  (e: 'click', event: MouseEvent): void
}

export interface JvResultSlots {
  /** 默认插槽 */
  default?: Slot
  /** 图标插槽 */
  icon?: Slot
  /** 标题插槽 */
  title?: Slot
  /** 副标题插槽 */
  subTitle?: Slot
  /** 额外插槽 */
  extra?: Slot
}

export interface JvResultExpose {
  // 暴露的方法和属性
}
