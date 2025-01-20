import type { Slot } from '@jovial/typings'
import type { Options, VirtualElement } from '@popperjs/core'
import type { VNodeChild } from 'vue'

export type ReferenceType = HTMLElement | Element | VirtualElement | undefined
export const popperProps = {

} as const
export interface PopperProps {
  /** 放置位置 */
  reference: ReferenceType
  /** 配置 */
  options: Partial<Options>
  modelValue: boolean
  /** 是否显示箭头 */
  arrow?: boolean
  /** 内容 */
  content?: VNodeChild | (() => VNodeChild)
}
export const popperEmits = {} as const
export interface PopperEmits {
  (e: 'update:modelValue', value: boolean): void
}
export const popperSlots = {} as const
export interface PopperSlots {
  default: Slot<any>
  content: Slot<any>
}

export interface PopperExpose {}
