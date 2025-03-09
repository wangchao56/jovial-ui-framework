import type { Placement } from '@floating-ui/vue'
import type { TriggerType } from '@jienix/typings'
import type { Slot } from 'vue'

export const jvPopoverProps = {
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom',
  },
  trigger: {
    type: String as PropType<TriggerType>,
    default: 'hover',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  visible: {
    type: Boolean,
    default: false,
  },
  transition: {
    type: String,
    default: 'jv-fade',
  },
  showAfter: {
    type: Number,
    default: 0,
  },
  hideAfter: {
    type: Number,
    default: 0,
  },
  autoClose: {
    type: Number,
  },
  tabindex: {
    type: Number,
    default: 0,
  },
  teleported: {
    type: Boolean,
  },
  persistent: {
    type: Boolean,
    default: true,
  },
} as const
export type JvPopoverProps = ExtractPropTypes<typeof jvPopoverProps>
export interface JvPopoverEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'beforeEnter'): void
  (e: 'afterEnter'): void
  (e: 'beforeLeave'): void
  (e: 'afterLeave'): void
  (e: 'show'): void
  (e: 'hide'): void
}
export interface JvPopoverSlots {
  default: Slot
  reference: Slot
}
export interface JvPopoverExpose {
  show: () => void
  hide: () => void
}
