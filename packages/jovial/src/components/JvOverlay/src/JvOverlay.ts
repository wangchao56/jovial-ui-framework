import type { CSSProperties } from 'vue'

export interface JvOverlayProps {
  /** 激活 */
  /** 显示 */
  modelValue: boolean
  /** 锁定滚动 */
  lockScroll?: boolean
  /** 遮罩层样式 */
  overlayStyle?: CSSProperties
  /** 遮罩层类名 */
  overlayClass?: string
  /** 包含 */
  contained?: boolean
  /** 关闭遮罩层 */
  closeOnClickOverlay?: boolean
};

export interface JvOverlayEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'closed'): void
  (e: 'opened'): void
}
export interface JvOverlaySlots {
  default: () => VNode
}
export interface JvOverlayExpose {}
