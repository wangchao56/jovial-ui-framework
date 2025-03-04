import type { CSSProperties, Slot, SlotsType } from 'vue'
import { convertToUnit } from '@jienix/utils'
import { useParentElement } from '@vueuse/core'
import { type JvTableColumn, type JvTableColumnType, useJvTableContext } from '../JvTable'
import '../../style/tbody.css'

const renderTableProps = {
  columns: {
    type: Array as PropType<JvTableColumnType[]>,
    required: true,
  },
  style: {
    type: Object as PropType<CSSProperties>,
    required: false,
  },
} as const

const RenderTable = defineComponent({
  name: 'RenderTable',
  props: renderTableProps,
  emits: {
    height: (_height: number) => true,
  },
  slots: Object as SlotsType<{
    default: Slot<{
      newColumns: JvTableColumnType[]
    }>
  }>,
  setup(props, { slots, emit }) {
    const tableRef = ref<HTMLElement>()
    const parent = useParentElement(tableRef)
    const tableContext = useJvTableContext()
    const { contentRect } = tableContext
    const scrollWidthRef = ref(parent.value?.scrollWidth || 0)
    watch(() => contentRect.value, (newValue) => {
      scrollWidthRef.value = newValue?.width || 0
    })

    // 获取所有叶子节点列
    const getLeafColumns = (columns: JvTableColumnType[]): JvTableColumn[] => {
      const leafColumns: JvTableColumn[] = []
      const traverse = (cols: JvTableColumnType[]) => {
        cols.forEach((column) => {
          if ('children' in column && column.children?.length) {
            traverse(column.children)
          }
          else {
            leafColumns.push(column as JvTableColumn)
          }
        })
      }
      traverse(columns)
      if (scrollWidthRef.value === 0) {
        return leafColumns
      }

      // 没有给定宽度的列
      const remainingColumns = leafColumns.filter(
        column => !column.width && column.key !== 'scroll',
      )
      // 剩余没有分配的列数为0，则给每列分配剩余的宽度
      if (remainingColumns.length === 0) {
        return leafColumns
      }
      // 计算宽度 如果给了宽度就使用宽度，如果没给宽度就平均分配父元素的宽度
      // 已占有的宽度
      const occupiedWidth = remainingColumns.reduce((acc, column) => {
        return acc + Number.parseFloat(column.width?.toString() || '0')
      }, 0)
      // 剩余没有分配的宽度
      const remainingWidth = scrollWidthRef.value - occupiedWidth

      return leafColumns.map((column) => {
        const width = convertToUnit(
          column.width ?? remainingWidth / remainingColumns.length,
        )
        return {
          ...column,
          width,
        }
      })
    }
    onMounted(() => {
      emit('height', tableRef.value?.clientHeight || 0)
    })
    const leafColumnsRef = computed(() => {
      return getLeafColumns(props.columns)
    })
    return () => {
      const leafColumns = leafColumnsRef.value
      return (
        <table
          ref={tableRef}
          style={{
            tableLayout: 'fixed',
            ...props.style,
          }}
          class="jv-table-native"
        >
          <colgroup>
            {leafColumns.map(column => (
              <col
                key={column.key}
                style={{
                  minWidth: column.width || 'fit-content',
                }}
              />
            ))}
          </colgroup>
          {slots.default?.({ newColumns: leafColumns })}
        </table>
      )
    }
  },
})

export default RenderTable
