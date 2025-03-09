import type { Slot } from '@jienix/typings'
import type { Instance, Options, VirtualElement } from '@popperjs/core'
import type { OnClickOutsideOptions } from '@vueuse/core'
import type { CSSProperties, Ref } from 'vue'

export type ReferenceType =
  | HTMLElement
  | Element
  | VirtualElement
  | undefined
  | null
export const popperProps = {
  /** 放置位置 */
  reference: {
    type: [Object, null, undefined] as PropType<ReferenceType>,
    required: true,
  },
  /** 配置 */
  options: {
    type: Object as PropType<Partial<Options>>,
    default: () => ({}),
  },
  /** 是否显示 */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /** 是否显示箭头 */
  arrow: {
    type: Boolean,
    default: false,
  },
  /** 自定义类名 */
  class: {
    type: String,
    default: '',
  },
  /** 自定义样式 */
  style: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },
  /** 是否手动控制 */
  manual: {
    type: Boolean,
    default: false,
  },
  /** 是否禁用点击外部关闭 */
  closeOnClickOutside: {
    type: [Boolean, Object] as PropType<boolean | OnClickOutsideOptions>,
    default: false,
  },
  /** 自定义属性 */
  dataPopper: {
    type: String,
    default: 'default-popper',
  },
  /** 是否禁用动画 */
  disableAnimation: {
    type: Boolean,
    default: false,
  },
  /** 动画名称 */
  transition: {
    type: String,
    default: 'fade',
  },
  /** 开启延时间 */
  openDelay: {
    type: Number,
    default: 150,
  },
  /** 关闭延时间 */
  closeDelay: {
    type: Number,
    default: 350,
  },
  /** 附加到哪个元素 */
  appendTo: {
    type: String,
    default: 'body',
  },
} as const

export type PopperProps = ExtractPropTypes<typeof popperProps>
export interface PopperEmits {
  /** 更新是否显示 */
  (e: 'update:modelValue', value: boolean): void
  /** 打开 */
  (e: 'open', visible: boolean): void
  /** 关闭 */
  (e: 'close', visible: boolean): void
  /** 点击 */
  (e: 'click', evt: MouseEvent): void
  /** 点击外部 */
  (e: 'clickOutside', visible: boolean, evt: MouseEvent): void
  /** 进入前执行 */
  (e: 'beforeEnter'): void
  /** 离开前执行 */
  (e: 'beforeLeave'): void
  /** 事件 */
  (e: HTMLElementEventMap[keyof HTMLElementEventMap]): void
}

export interface PopperSlots {
  /** 默认插槽 */
  default: Slot
}

export interface PopperExpose {
  /** 是否显示 */
  visible: Readonly<Ref<boolean>>
  /** 根元素 */
  root: Readonly<Ref<HTMLElement | null>>
  /** popper实例 */
  popperInstance: Instance | null
  /** 更新 */
  update: () => void
  /** 销毁 */
  destroy: () => void
  /** 显示 */
  show: () => void
  /** 隐藏 */
  hide: () => void
  /** 切换 */
  toggle: () => void
}
