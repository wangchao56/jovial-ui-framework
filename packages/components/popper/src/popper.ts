import {
  MaybeElement,
  Placement,
  ReferenceElement,
  UseFloatingReturn
} from '@floating-ui/vue'
import type { PropType, Ref, VNodeChild } from 'vue'

export type ReferenceType = Readonly<Ref<MaybeElement<ReferenceElement>>>
export const popperProps = {
  visible: {
    type: Boolean,
    default: false
  },
  reference: {
    type: Object as PropType<Readonly<Ref<MaybeElement<ReferenceElement>>>>,
    default: null
  },
  /**偏移量 */
  offset: {
    type: Number,
    default: 8
  },
  /**翻转 */
  flip: {
    type: Boolean,
    default: false
  },
  /**跟随 */
  followCursor: {
    type: Boolean,
    default: false
  },
  arrow: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'small'
  },
  /**偏移 */
  shift: {
    type: Boolean,
    default: true
  },
  /**对齐方式 */
  placement: {
    type: String as PropType<Placement>,
    default: 'top-center'
  }
} as const
export interface PopperProps {}
export const popperEmits = {} as const
export type PopperEmits = {}
export const popperSlots = {} as const
export type PopperSlots = {
  activator: (() => VNodeChild | VNodeChild[]) | undefined
}
export type PopperExpose = UseFloatingReturn & {}
