import type { Slot } from 'vue'

export type ResultStatus = 'success' | 'error' | 'info' | 'warning'

export const jvResultProps = {
  title: {
    type: String,
    default: '',
  },
  subTitle: {
    type: String,
    default: '',
  },
  status: {
    type: String as PropType<ResultStatus>,
    default: 'info',
  },
  icon: {
    type: String as PropType<string>,
    default: '',
  },
} as const

export type JvResultProps = ExtractPropTypes<typeof jvResultProps>

export interface JvResultEmits {
  // 暴露基础事件
  (e: 'click', event: MouseEvent): void
}

export interface JvResultSlots {
  default?: Slot
  icon?: Slot
  title?: Slot
  subTitle?: Slot
  extra?: Slot
}

export interface JvResultExpose {
  // 暴露的方法和属性
}
