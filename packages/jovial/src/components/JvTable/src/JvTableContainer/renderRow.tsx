import type { Slot, SlotsType } from 'vue'
import { createNamespace } from '@jovial/utils'
import { type JvCellProps, jvRowProps } from './types'
import '../../style/row.css'

const renderRow = defineComponent({
  name: 'JvRenderRow',
  props: jvRowProps,
  slots: Object as SlotsType<{
    cell: Slot<JvCellProps>
    expand: Slot<JvCellProps>
  }>,
  setup(props, { slots }) {
    const bem = createNamespace('table__row')
    return () => {
      const { record, index, columns } = toRefs(props)
      return (
        <tr role="row" aria-rowindex={index.value} class={bem.b()}>
          {columns.value.map(column => (
            slots.cell?.({ record: record.value!, column, index: index.value })
          ))}
          {/* 可展开行 */}
          {slots.expand?.({ record: record.value!, index: index.value })}
        </tr>
      )
    }
  },
})

export default renderRow
