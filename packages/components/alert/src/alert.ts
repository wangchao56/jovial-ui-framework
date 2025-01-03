import type { PropType, VNodeChild } from 'vue'
import type { Type } from '../../button'

export const alertProps = {
  title: {
    type: String,
    default: ''
  },
  type: {
    type: String as PropType<AlertProps['type']>,
    default: 'info'
  },
  message: {
    type: String,
    required: true
  },
  closable: {
    type: Boolean,
    default: true
  },
  closeText: {
    type: String
  },
  showIcon: {
    type: Boolean,
    default: false
  }
} as const
export interface AlertProps {
  title?: string
  message: string
  closable?: boolean
  closeText?: string
  type?: Exclude<Type, 'primary' | 'default'>
  showIcon?: boolean
}
export const alertEmits = {
  close: null
} as const
export type AlertEmits = {
  (event: 'close'): void
}
export const alertSlots = {
  default: null
} as const
export type AlertSlots = {
  default?: () => VNodeChild[]
}
export type AlertExpose = {}
