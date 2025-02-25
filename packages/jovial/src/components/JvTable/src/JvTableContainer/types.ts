import type { JvTableColumn } from '../JvTable'

export const jvCellProps = {
  tag: {
    type: String,
    default: 'td',
    validator: (value: string) => {
      return ['td', 'th'].includes(value)
    },
  },
  /**
   * 行数据
   */
  row: {
    type: Object as PropType<Record<string, any>>,
    required: true,
  },
  /**
   * 列配置
   */
  column: {
    type: Object as PropType<JvTableColumn>,
    required: true,
  },
  /**
   * 行索引
   */
  rowIndex: {
    type: Number,
    required: true,
  },
  /**
   * 列索引
   */
  columnIndex: {
    type: Number,
    required: true,
  },
} as const

export type JvCellProps = ExtractPropTypes<typeof jvCellProps>

export const jvRowProps = {
  /**
   * 行数据
   */
  row: {
    type: Object as PropType<Record<string, any>>,
    required: true,
  },
  /**
   * 行索引
   */
  rowIndex: {
    type: Number,
    required: true,
  },
  /**
   * 列配置数组
   */
  columns: {
    type: Array as PropType<JvTableColumn[]>,
    default: () => [],
    required: true,
  },
} as const

export type JvRowProps = ExtractPropTypes<typeof jvRowProps>

export interface JvTableContainerContext {
  scrollState: Ref<{
    isScroll: boolean
    scrollX: number
    scrollY: number
  }>
}

export const JvTableContainerContextKey: InjectionKey<JvTableContainerContext> = Symbol.for('JvTableContainerContextKey')

export interface RenderRowScope<T extends Record<string, any> = any> {
  key: PropertyKey
  // 当前行数据
  row: T
  // 行索引
  rowIndex: number
  // 列配置数组
  columns: JvTableColumn<T>[]
}

// 单元格渲染的作用域参数
export interface RenderCellScope<T extends Record<string, any> = any> {
  key: PropertyKey
  // 当前行数据
  row: T
  // 列配置
  column: JvTableColumn<T>
  // 行索引
  rowIndex: number
  // 列索引
  columnIndex: number
}
export interface RenderTbodyContext {
  test: string
}

export const RenderTbodyContextKey: InjectionKey<RenderTbodyContext> = Symbol.for('RenderTbodyContextKey')

// 自定义渲染cell插槽的参数
export interface CustomRenderCellScope<T extends Record<string, any> = any> {
  key: PropertyKey
  record: T
  rowIndex: number
  column: JvTableColumn
  columnIndex: number
}

// 写一个类型工具,从interface中提取出制定的key,组成新的interface
export type ExtractInterfaceKey<T, K extends keyof T> = {
  [P in K]: T[P]
}

// 提取出td和th 的类型
export type CellTag = ExtractInterfaceKey<HTMLElementTagNameMap, 'td' | 'th'>
