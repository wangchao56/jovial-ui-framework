import type { ExtractPropTypes, PropType, Slot } from 'vue'

export const jvSplitProps = {
  /** 方向 */
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },
  /** 触发器大小 */
  triggerSize: {
    type: Number,
    default: 10,
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 默认大小 */
  defaultSize: {
    type: String as PropType<string | number>,
    default: '50%',
  },
  /** 当前大小（受控模式） */
  size: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
  /** 最小大小 */
  min: {
    type: String as PropType<string | number>,
    default: '0%',
  },
  /** 最大大小 */
  max: {
    type: String as PropType<string | number>,
    default: '100%',
  },
  /** 面板1类名 */
  paneOneClass: {
    type: String,
    default: '',
  },
  /** 面板1样式 */
  paneOneStyle: {
    type: String as PropType<string | Record<string, any>>,
    default: '',
  },
  /** 面板2类名 */
  paneTwoClass: {
    type: String,
    default: '',
  },
  /** 面板2样式 */
  paneTwoStyle: {
    type: String as PropType<string | Record<string, any>>,
    default: '',
  },
} as const

export type JvSplitProps = Partial<ExtractPropTypes<typeof jvSplitProps>>

export interface JvSplitEmits {
  /** 更新大小 */
  (e: 'update:size', size: string | number): void
  /** 拖拽开始 */
  (e: 'dragStart', evt: MouseEvent): void
  /** 拖拽移动 */
  (e: 'dragMove', evt: MouseEvent): void
  /** 拖拽结束 */
  (e: 'dragEnd', evt: MouseEvent): void
}

export interface JvSplitSlots {
  default?: Slot
  paneOne?: Slot
  paneTwo?: Slot
  trigger?: Slot
}

export interface JvSplitExpose {
  // 暴露的方法
  /** 获取当前分割大小 */
  getSize: () => string | number
  /** 重置分割大小到默认值 */
  resetSize: () => void
}
