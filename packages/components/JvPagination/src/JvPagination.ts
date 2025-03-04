import type { VNodeChild } from 'vue'

/** 分页器配置 */
export interface JvPaginationProps {
  /** 当前页码 */
  modelValue?: number
  /** 总条目数 */
  total?: number
  /** 每页显示条目数 */
  pageSize?: number
  /** 页码按钮的数量 */
  pagerCount?: number
  /** 是否显示快速跳转 */
  showQuickJumper?: boolean
  /** 是否显示每页条数选择器 */
  showSizeChanger?: boolean
  /** 每页显示条目数选项列表 */
  pageSizeOptions?: number[]
  /** 是否显示总条目数 */
  showTotal?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 是否显示较少的页码 */
  simple?: boolean
}

export const jvPaginationProps = {
  /** 当前页码 */
  modelValue: {
    type: Number,
    default: 1,
  },
  /** 总条目数 */
  total: {
    type: Number,
    default: 0,
  },
  /** 每页显示条目数 */
  pageSize: {
    type: Number,
    default: 10,
  },
  /** 页码按钮的数量 */
  pagerCount: {
    type: Number,
    default: 7,
  },
  /** 是否显示快速跳转 */
  showQuickJumper: {
    type: Boolean,
    default: false,
  },
  /** 是否显示每页条数选择器 */
  showSizeChanger: {
    type: Boolean,
    default: false,
  },
  /** 每页显示条目数选项列表 */
  pageSizeOptions: {
    type: Array as () => number[],
    default: () => [10, 20, 50, 100],
  },
  /** 是否显示总条目数 */
  showTotal: {
    type: Boolean,
    default: false,
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 是否显示较少的页码 */
  simple: {
    type: Boolean,
    default: false,
  },
} as const

export interface JvPaginationEmits {
  /** 页码改变时触发 */
  (e: 'update:modelValue', page: number): void
  /** 每页条数改变时触发 */
  (e: 'update:pageSize', size: number): void
  /** 页码改变时触发 */
  (e: 'change', page: number, pageSize: number, total: number): void
}

export interface JvPaginationSlots {
  /** 自定义总数显示 */
  total?: (props: { total: number, range: [number, number] }) => VNodeChild
  /** 自定义上一页按钮 */
  prev?: () => VNodeChild
  /** 自定义下一页按钮 */
  next?: () => VNodeChild
  /** 自定义页码 */
  page?: (props: { page: number, active: boolean }) => VNodeChild
}
