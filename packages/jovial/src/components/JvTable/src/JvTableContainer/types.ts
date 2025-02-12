import type { JvTableColumn } from '../JvTable'

export const jvCellProps = {
  index: Number,
  record: Object as PropType<any>,
  column: {
    type: Object as PropType<JvTableColumn>,
    required: true,
  },
} as const

export type JvCellProps = ExtractPropTypes<typeof jvCellProps>

export const jvRowProps = {
  index: Number,
  record: Object as PropType<any>,
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
