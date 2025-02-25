import type { JvTableColumnType } from '../JvTable'
import { createNamespace } from '@jovial/utils'
import RenderTable from './renderTable.tsx'
import { RenderTbodyContextKey } from './types'
import '../../style/tbody.css'

const renderTbodyProps = {
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  columns: {
    type: Array as PropType<JvTableColumnType[]>,
    required: true,
  },
  columnsWidth: {
    type: Array as PropType<string[]>,
    required: false,
  },
} as const

const RenderTbody = defineComponent({
  name: 'RenderTbody',
  props: renderTbodyProps,
  setup(props, { slots }) {
    const bem = createNamespace('table')
    provide(RenderTbodyContextKey, {
      test: 'test',
    })
    const newColumnsRef = computed(() => {
      return [
        ...props.columns,
        {
          key: 'scroll',
          title: '',
          width: 17,
        },
      ]
    })
    return () => {
      const newColumns = newColumnsRef.value
      return (
        <RenderTable columns={newColumns}>
          <tbody
            role="rowgroup"
            class={bem.e('tbody')}
          >
            {slots.default?.()}
          </tbody>
        </RenderTable>
      )
    }
  },
})

export default RenderTbody
