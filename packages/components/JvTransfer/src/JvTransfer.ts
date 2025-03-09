import type { Slot } from 'vue'

export const jvTransferProps = {
  /** 选中值 */
  modelValue: {
    type: Array as PropType<(string | number)[]>,
    default: () => [],
  },
  /** 选项数据 */
  data: {
    type: Array as PropType<TransferItem[]>,
    default: () => [],
  },
  /** 标题 */
  titles: {
    type: Array as PropType<string[]>,
    default: () => ['列表1', '列表2'],
  },
  /** 是否可搜索 */
  filterable: {
    type: Boolean,
    default: false,
  },
  /** 搜索框占位文本 */
  filterPlaceholder: {
    type: String,
    default: '请输入搜索内容',
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
} as const

export interface TransferItem {
  key: string | number
  label: string
  disabled?: boolean
}

export type JvTransferProps = Partial<ExtractPropTypes<typeof jvTransferProps>>

export interface JvTransferEmits {
  /**
   * 更新选中值
   */
  (e: 'update:modelValue', value: (string | number)[]): void
  /**
   * 右侧改变时触发
   */
  (e: 'changeRight', value: (string | number)[]): void
  /**
   * 左侧改变时触发
   */
  (e: 'changeLeft', value: (string | number)[]): void
}

export interface JvTransferSlots {
  /** 自定义内容 */
  'default'?: Slot
  /** 左侧底部内容 */
  'left-footer'?: Slot
  /** 右侧底部内容 */
  'right-footer'?: Slot
  /** 左侧头部内容 */
  'left-header'?: Slot
  /** 右侧头部内容 */
  'right-header'?: Slot
}

export interface JvTransferExpose {
  /**
   * 根元素
   */
  root: Ref<HTMLElement>
  /**
   * 清除查询
   */
  clearQuery: (direction: 'left' | 'right') => void
}
