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
  (e: 'update:modelValue', value: (string | number)[]): void
  (e: 'changeRight', value: (string | number)[]): void
  (e: 'changeLeft', value: (string | number)[]): void
}

export interface JvTransferSlots {
  /** 自定义内容 */
  'default'?: () => any
  /** 左侧底部内容 */
  'left-footer'?: () => any
  /** 右侧底部内容 */
  'right-footer'?: () => any
  /** 左侧头部内容 */
  'left-header'?: () => any
  /** 右侧头部内容 */
  'right-header'?: () => any
}

export interface JvTransferExpose {
  clearQuery: (direction: 'left' | 'right') => void
}
