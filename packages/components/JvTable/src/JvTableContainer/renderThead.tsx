import type { JvTableColumn, JvTableColumnType } from '../JvTable'
import { convertToUnit, createNamespace } from '@jienix/utils'
import RenderCell from './renderCell'
import RenderTable from './renderTable'
import '../../style/thead.css'
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
const jvTheadProps = {
  columns: {
    type: Array as PropType<JvTableColumnType[]>,
    required: true,
  },
  scrollX: {
    type: Number,
    default: 0,
  },
  scrollY: {
    type: Number,
    default: 0,
  },
} as const

const RenderThead = defineComponent({
  name: 'RenderThead',
  inheritAttrs: true,
  props: jvTheadProps,
  emits: {
    scroll: (_pos: { x: number, y: number }) => true,
  },
  components: {
    RenderCell,
  },
  setup(props, { emit }) {
    const bem = createNamespace('table')
    // 计算表头层级
    const getHeaderRows = (columns: JvTableColumnType[]) => {
      const rows: JvTableColumnType[][] = []

      const maxLevel = (columns: JvTableColumnType[]) => {
        let max = 1
        columns.forEach((column) => {
          if ('children' in column) {
            const childrenMax = maxLevel(column.children) + 1
            max = Math.max(max, childrenMax)
          }
        })
        return max
      }

      const visitColumn = (
        columns: JvTableColumnType[],
        level = 0,
        parent?: JvTableColumnType,
      ) => {
        rows[level] = rows[level] || []

        columns.forEach((column) => {
          const cell = { ...column } as JvTableColumn & {
            parent?: JvTableColumn
          }

          if (parent) {
            cell.parent = parent
          }

          rows[level].push(cell)

          if ('children' in column && column.children) {
            visitColumn(column.children, level + 1, column)
          }
        })
      }

      const levels = maxLevel(columns)
      for (let i = 0; i < levels; i++) {
        rows.push([])
      }

      visitColumn(columns)

      return rows
    }

    // 计算单元格colspan和rowspan
    const getSpans = (
      column: JvTableColumnType,
      rows: JvTableColumnType[][],
      rowIndex: number,
    ) => {
      let rowspan = 1
      let colspan = 1

      const hasChildren = 'children' in column && column.children?.length

      if (hasChildren) {
        colspan = column.children!.reduce((total, child) => {
          const childSpans = getSpans(child, rows, rowIndex + 1)
          return total + childSpans.colspan
        }, 0)
      }
      else {
        rowspan = rows.length - rowIndex
      }

      return { rowspan, colspan }
    }

    const theadRef = ref<HTMLDivElement>()
    const scrollRef = ref<HTMLDivElement>()
    const theadHeight = ref(0)
    // 获取横向滚动的

    watch(
      () => props.scrollX,
      (val) => {
        if (val <= 0)
          return
        scrollRef.value?.scrollTo({
          left: Math.abs(val || 0),
          // behavior: 'smooth'
        })
      },
      {
        flush: 'post',
      },
    )

    return () => {
      const { columns, scrollY } = props
      // 需要在增加一组列，用于占位滚动条
      const newColumns = [
        ...columns,
        {
          key: 'scroll',
          title: '',
          width: 17,
        },
      ]
      const headerRows = getHeaderRows(newColumns)

      return (
        <div
          ref={theadRef}
          class={[bem.e('thead__container')]}
          style={{
            height: convertToUnit(theadHeight.value),
            position: scrollY ? 'sticky' : 'static',
          }}
        >
          <div
            ref={scrollRef}
            class={bem.e('thead__scroll')}
            onScroll={(e) => {
              e.preventDefault()
              e.stopPropagation()
              emit('scroll', {
                x: (e.target as HTMLDivElement).scrollLeft,
                y: (e.target as HTMLDivElement).scrollTop,
              })
            }}
          >
            <RenderTable
              columns={newColumns}
              onHeight={(_height) => {
                theadHeight.value = _height
              }}
            >
              <thead class={bem.e('thead')}>
                {headerRows.map((row, rowIndex) => (
                  <tr
                    class={bem.e('row')}
                    key={`rowIndex${rowIndex}`}
                    aria-rowindex={rowIndex}
                  >
                    {row.map((column, columnIndex) => {
                      const { rowspan, colspan } = getSpans(
                        column,
                        headerRows,
                        rowIndex,
                      )
                      return (
                        <RenderCell
                          tag="th"
                          key={column.key}
                          column={column}
                          row={column}
                          rowIndex={rowIndex}
                          columnIndex={columnIndex}
                          {...{
                            rowspan,
                            colspan,
                          }}
                        >
                          {column.title}
                        </RenderCell>
                      )
                    })}
                  </tr>
                ))}
              </thead>
            </RenderTable>
          </div>
        </div>
      )
    }
  },
})

export default RenderThead
