import type { JvPaginationProps } from '@/components/JvPagination'
import type { PropType } from 'vue'

// 表头类型
export interface JvTableColumn<T extends Record<string, any> = any> {
  /** 标题 */
  title: string
  /** 唯一标识 */
  key: string
  /** 数据源 路径 */
  dataIndex?: string | string[]
  /** 宽度 */
  width?: number | string
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

// 表头支持分组
export interface JvTableColumnGroupType<T extends Record<string, any> = any> {
  /** 标题 */
  title: string
  /** 唯一标识 */
  key: string
  /** 子列 */
  children: JvTableColumnType<T>[]
}
// 普通表头类型
export type JvTableColumnType<T extends Record<string, any> = any> = JvTableColumn<T> | JvTableColumnGroupType<T>
// 表头类型
export type JvTableColumnsType<T extends Record<string, any> = any> = JvTableColumnType<T>[]

export interface JvTableData {
  [key: string]: any
}

export interface PaginationConfig extends JvPaginationProps {
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
    type: Array as PropType<JvTableColumnType[]>,
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
  width: {
    type: [Number, String] as PropType<number | string>,
  },
  height: {
    type: [Number, String] as PropType<number | string>,
  },
  pagination: {
    type: [Object, Boolean] as PropType<PaginationConfig | boolean>,
    default: () => ({ current: 1, pageSize: 10 }),
  },
} as const

export interface JvTableProps {
  dataSource: any[]
  columns: JvTableColumnType[]
  rowHeight?: number
  buffer?: number
  height: number
}

export interface JvTableEmits {
  (e: 'rowClick', row: any): void
  (e: 'sortChange', { column, order }: { column: JvTableColumnType, order: 'asc' | 'desc' }): void
  (e: 'pageChange', page: number, pageSize: number, total: number): void
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

export interface JvTableContext {
  contentRect: Ref<DOMRectReadOnly | undefined>
  dataSource: Ref<any[]>
  columns: Ref<JvTableColumnType[]>
  rowHeight: Ref<number>
  pagination: Ref<PaginationConfig | boolean>
  onPageChange: (page: number, pageSize: number, total: number) => void
}
export const JvTableContextKey: InjectionKey<JvTableContext> = Symbol.for('JvTableContextKey')

export function useJvTableContext() {
  const context = inject<JvTableContext>(JvTableContextKey)
  if (!context) {
    throw new Error('JvTableContext is not found')
  }
  return context
}
