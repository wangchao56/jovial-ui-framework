import type { JvTableColumn } from '../JvTable'
import type { JvTableContainerContext } from './types'
import { createNamespace } from '@jovial/utils'
import { get } from 'lodash-es'
import { jvCellProps, JvTableContainerContextKey } from './types'
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

const JvRenderCell = defineComponent({
  name: 'JvRenderCell',
  inheritAttrs: true,
  props: jvCellProps,
  setup(props, { slots }) {
    const bem = createNamespace('table__cell')
    const { scrollState } = inject(JvTableContainerContextKey) as JvTableContainerContext
    const isScroll = computed(() => Math.abs(scrollState.value.scrollX) > 0 && !!props.column?.fixed)
    const getCellValue = (record: any, column: JvTableColumn) => {
      if (!column.dataIndex)
        return null
      if (typeof column.dataIndex === 'string')
        return record[column.dataIndex]
      if (Array.isArray(column.dataIndex) && column.dataIndex && column.dataIndex.length > 0)
        return get(record, column.dataIndex.join('.'))
      return null
    }
    // render函数
    return () => {
      const { record, column } = props
      return (
        <td
          aria-colindex={column?.key}
          role="cell"
          style={{
            width: column?.width,
          }}
          class={[
            bem.b(),
            bem.is('fixed', isScroll.value),
            bem.m(`align-${column?.align ?? 'left'}`),
            ...(column?.fixed ? [bem.m(`fixed-${column?.fixed}`)] : []),
          ]}
        >
          {slots.default ? slots.default({ record, column }) : getCellValue(record, column)}
        </td>
      )
    }
  },
})

export default JvRenderCell
