import type { Slot } from '@jovial/typings'
import type { Instance, Options, VirtualElement } from '@popperjs/core'
import type { MaybeElementRef } from '@vueuse/core'
import type { CSSProperties } from 'vue'

export type ReferenceType = HTMLElement | Element | VirtualElement | undefined | null
export const popperProps = {

} as const
export interface PopperProps {
  /** 放置位置 */
  reference: ReferenceType
  /** 配置 */
  options?: Partial<Options>
  /** 是否显示 */
  modelValue?: boolean
  /** 是否显示箭头 */
  arrow?: boolean
  /** 自定义类名 */
  class?: string
  /** 自定义样式 */
  style?: CSSProperties
  /** 是否手动控制 */
  manual?: boolean
  /** 是否禁用点击外部关闭 */
  closeOnClickOutside?: boolean | {
    ignore?: MaybeRefOrGetter<(MaybeElementRef | string)[]>
    detectIframe?: boolean
    capture?: boolean
  }
  /** 自定义属性 */
  dataPopper?: string
  /** 是否禁用动画 */
  disableAnimation?: boolean
  /** 动画名称 */
  transition?: string
  /** 开启延时间 */
  openDelay?: number
  /** 关闭延时间 */
  closeDelay?: number
  /** 附加到哪个元素 */
  appendTo?: string
}
export const popperEmits = {} as const
export interface PopperEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'open', visible: boolean): void
  (e: 'close', visible: boolean): void
  (e: 'click', evt: MouseEvent): void
  (e: 'clickOutside', visible: boolean, evt: MouseEvent): void
  (e: 'clickOverlay', visible: boolean, evt: MouseEvent): void
  (e: HTMLElementEventMap[keyof HTMLElementEventMap]): void
}
export const popperSlots = {} as const
export interface PopperSlots {
  default: Slot<any>
}

export interface PopperExpose {
  visible: Readonly<Ref<boolean>>
  root: Readonly<Ref<HTMLElement | null>>
  popperInstance: Instance | null
  update: () => void
  destroy: () => void
  show: () => void
  hide: () => void
  toggle: () => void
}
