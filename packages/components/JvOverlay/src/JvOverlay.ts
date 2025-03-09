import type { CSSProperties, Slot } from 'vue'

export const jvOverlayProps = {
  /** 激活 */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /** 锁定滚动 */
  lockScroll: {
    type: Boolean,
    default: true,
  },
  /** 遮罩层样式 */
  overlayStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },
  /** 遮罩层类名 */
  overlayClass: {
    type: String,
    default: '',
  },
  /** 包含 */
  contained: {
    type: Boolean,
    default: false,
  },
  /** 关闭遮罩层 */
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
}

export type JvOverlayProps = ExtractPropTypes<typeof jvOverlayProps>

export interface JvOverlayEmits {
  /** 更新激活 */
  (e: 'update:modelValue', value: boolean): void
  /** 关闭 */
  (e: 'closed'): void
  /** 打开 */
  (e: 'opened'): void
}
export interface JvOverlaySlots {
  /** 默认插槽 */
  default: Slot
}
export interface JvOverlayExpose {}
