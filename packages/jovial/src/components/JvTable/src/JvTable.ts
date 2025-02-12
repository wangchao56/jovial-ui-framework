import type { PropType } from 'vue'

export interface JvTableColumn<T = any> {
  /** 标题 */
  title: string
  /** 唯一标识 */
  key: string
  /** 数据源 路径 */
  dataIndex?: string | string[]
  /** 宽度 */
  width?: number
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right'
  /** 固定 */
  fixed?: 'left' | 'right'
  /** 格式化函数 */
  formatter?: (value: any, row: T) => string
  /** 渲染函数 */
  render?: (value: any, row: T) => string
  /** 是否可排序 */
  sortable?: boolean
  /** 排序函数 */
  sorter?: (a: T, b: T) => number
  /** 是否可过滤 */
  filterable?: boolean
  /** 过滤选项 */
  filters?: { text: string, value: string }[]
  /** 默认过滤值 */
  defaultFilteredValue?: string[]
  /** 过滤函数 */
  onFilter?: (value: any, row: T) => boolean
}

export interface JvTableData {
  [key: string]: any
}

export interface PaginationConfig {
  current?: number
  pageSize?: number
  total?: number
  pageSizeOptions?: number[]
  showSizeChanger?: boolean
  showQuickJumper?: boolean
}

export const jvTableProps = {
  dataSource: {
    type: Array as PropType<any[]>,
    required: true,
    default: () => [],
  },
  columns: {
    type: Array as PropType<JvTableColumn[]>,
    required: true,
  },
  rowHeight: {
    type: Number,
    default: 40,
  },
  buffer: {
    type: Number,
    default: 5,
  },
  height: {
    type: Number,
    required: true,
  },
  pagination: {
    type: [Object, Boolean] as PropType<PaginationConfig | boolean>,
    default: () => ({ current: 1, pageSize: 10 }),
  },
} as const

export interface JvTableProps {
  dataSource: any[]
  columns: JvTableColumn[]
  rowHeight?: number
  buffer?: number
  height: number
}

export interface JvTableEmits {
  (e: 'rowClick', row: any): void
  (e: 'sortChange', { column, order }: { column: JvTableColumn, order: 'asc' | 'desc' }): void
  (e: 'pageChange', page: number, pageSize: number): void
}

export interface JvTableSlots {
  default?: () => any
  row?: { row: any }
  header?: () => any
  pagination?: () => any
}

export interface JvTableExpose {
  scrollTo: (position: number) => void
  resetSort: () => void
}
