import type { Slot, SlotsType } from 'vue'
import { createNamespace } from '@jovial/utils'
import { jvRowProps, type RenderCellScope } from './types'
import '../../style/row.css'

const RenderRow = defineComponent({
  name: 'RenderRow',
  props: jvRowProps,
  slots: Object as SlotsType<{
    cell: Slot<RenderCellScope<Record<string, any>>>
  }>,
  setup(props, { slots }) {
    const bem = createNamespace('table__row')
    return () => {
      const { row, rowIndex, columns } = props
      return (
        <tr role="row" aria-rowindex={rowIndex} class={bem.b()}>
          {columns.map((column, columnIndex) => (
            slots.cell?.({ key: column.key, row, rowIndex, column, columnIndex })
          ))}
          {/* 可展开行 */}
          {/* {slots.expand ? slots.expand({ key: 'expand', row, rowIndex: rowIndex.value, column: columns.value[columns.value.length - 1] }) : null} */}
        </tr>
      )
    }
  },
})

export default RenderRow
