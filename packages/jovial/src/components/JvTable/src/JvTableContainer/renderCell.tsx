import type { Slot, SlotsType } from 'vue'
import type {
  JvTableColumn,
} from '../JvTable'
import type {
  CellTag,
  CustomRenderCellScope,
  JvTableContainerContext,
} from './types'
import { createNamespace } from '@jovial/utils'
import { get } from 'lodash-es'
import {
  jvCellProps,
  JvTableContainerContextKey,
} from './types'
import '../../style/cell.css'
/**
 * 取值问题
 * const record = {
 *  name: '张三',
 *  age: 18,
 *  address: '北京',
 *  a:{
 *    b: 'c',
 *  }
 * }
 * dataIndex 为空时，取值为  null
 * dataIndex 取值 为 string 类型
 *  record.dataIndex || record[dataIndex]
 * dataIndex 取值为 数组时，取值为 ['name', 'a']
 * record.a.b 取值为 'c'
 */

const RenderCell = defineComponent({
  name: 'RenderCell',
  inheritAttrs: true,
  props: jvCellProps,
  slots: Object as SlotsType<{
    default: Slot<CustomRenderCellScope<Record<string, any>>>
  }>,
  setup(props, { slots }) {
    const bem = createNamespace('table__cell')
    const { scrollState } = inject(
      JvTableContainerContextKey,
    ) as JvTableContainerContext
    const isScroll = computed(
      () => Math.abs(scrollState.value.scrollX) > 0 && !!props.column?.fixed,
    )

    const getCellValue = (record: any, column: JvTableColumn) => {
      if (!column.dataIndex)
        return null
      if (typeof column.dataIndex === 'string')
        return record[column.dataIndex]
      if (
        column.dataIndex
        && Array.isArray(column.dataIndex)
        && column.dataIndex.length > 0
      ) {
        return get(record, column.dataIndex.join('.'))
      }
      return null
    }
    // render函数
    return () => {
      const { row, rowIndex, column, columnIndex } = toRefs(props)
      const TAG = props.tag as keyof CellTag
      return (
        <TAG
          aria-colindex={columnIndex.value}
          role="cell"
          style={{
            width: column.value?.width,
          }}
          class={[
            bem.b(),
            bem.is('fixed', isScroll.value),
            bem.m(`align-${column.value?.align ?? 'center'}`),
            ...(column.value?.fixed
              ? [bem.m(`fixed-${column.value?.fixed}`)]
              : []),
          ]}
        >
          {slots.default
            ? slots.default({
                key: column.value?.key,
                record: row.value,
                rowIndex: rowIndex.value,
                column: column.value,
                columnIndex: columnIndex.value,
              })
            : getCellValue(row, column.value)}
        </TAG>
      )
    }
  },
})

export default RenderCell
