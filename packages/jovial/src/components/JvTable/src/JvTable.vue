<script setup lang="ts">
import type { JvTableColumn, JvTableColumnType, JvTableEmits, JvTableExpose } from './JvTable'
import type { CustomRenderCellScope } from './JvTableContainer/types'
import { convertToUnit, createNamespace } from '@jovial/utils'
import { useResizeObserver } from '@vueuse/core'
import { computed, h, ref, type Slot } from 'vue'
import { JvTableContextKey, jvTableProps } from './JvTable'
import JvTableContainer from './JvTableContainer/index.vue'
import RenderCell from './JvTableContainer/renderCell.tsx'
import RenderRow from './JvTableContainer/renderRow.tsx'
import JvTableFooter from './JvTableFooter.vue'
import JvTableHeader from './JvTableHeader.vue'
import '../style/table.css'

defineOptions({ name: 'JvTable' })
const props = defineProps(jvTableProps)
const emit = defineEmits<JvTableEmits>()
defineSlots<{
  cell: Slot<CustomRenderCellScope<Record<string, any>>>
}>()
const bem = createNamespace('table')
const tableRef = ref<HTMLElement>()
const scrollTop = ref(0)
const currentSort = ref<{ column?: JvTableColumnType, order?: 'asc' | 'desc' }>({})

// 处理排序
// eslint-disable-next-line unused-imports/no-unused-vars
function handleSort(column: JvTableColumn) {
  if (!column.sortable)
    return

  const newOrder = currentSort.value.order === 'asc' ? 'desc' : 'asc'
  currentSort.value = { column, order: newOrder }
  emit('sortChange', { column, order: newOrder })
}

// 计算可见区域
// eslint-disable-next-line unused-imports/no-unused-vars
const visibleItems = computed(() => {
  const startIdx = Math.max(0, Math.floor(scrollTop.value / props.rowHeight) - props.buffer)
  const endIdx = Math.min(
    props.dataSource.length,
    startIdx + Math.ceil(props.height / props.rowHeight) + props.buffer * 2,
  )
  return {
    startIdx,
    endIdx,
    items: props.dataSource.slice(startIdx, endIdx),
  }
})

// 计算总高度
// eslint-disable-next-line unused-imports/no-unused-vars
const totalHeight = computed(() => props.dataSource.length * props.rowHeight)

// 暴露方法
defineExpose<JvTableExpose>({
  scrollTo: (position: number) => {
    if (tableRef.value) {
      tableRef.value.scrollTop = position
    }
  },
  resetSort: () => {
    currentSort.value = {}
  },
})

// 滚动处理
// eslint-disable-next-line unused-imports/no-unused-vars
function handleScroll(event: Event) {
  const target = event.target as HTMLElement
  scrollTop.value = target.scrollTop
}

// 分页相关逻辑
// eslint-disable-next-line unused-imports/no-unused-vars
const internalData = computed(() => {
  if (!props.pagination)
    return props.dataSource
  const { current = 1, pageSize = 10 } = typeof props.pagination === 'boolean'
    ? { current: 1, pageSize: 10 }
    : props.pagination

  const start = (current - 1) * pageSize
  return props.dataSource.slice(start, start + pageSize)
})

const finalWidth = computed(() => {
  if (props.width)
    return convertToUnit(props.width)
  return '100%'
})

const finalHeight = computed(() => {
  if (props.height)
    return convertToUnit(props.height)
  return '100%'
})
const contentRect = ref<DOMRectReadOnly>()
const resizeObserver = useResizeObserver(tableRef, (entries) => {
  contentRect.value = entries[0].contentRect
}, {
  box: 'border-box',
})

onUnmounted(() => {
  resizeObserver.stop()
})

provide(JvTableContextKey, {
  contentRect,
  dataSource: toRef(props, 'dataSource'),
  columns: toRef(props, 'columns'),
  rowHeight: toRef(props, 'rowHeight'),
  pagination: toRef(props, 'pagination'),
  onPageChange: (page: number, pageSize: number, total: number) => {
    emit('pageChange', page, pageSize, total)
  },
})
</script>

<template>
  <div
    ref="tableRef"
    :class="bem.b()"
    :style="{
      ...(width ? { width: finalWidth } : {}),
      ...(height ? { height: finalHeight } : {}),
    }"
  >
    <JvTableHeader
      title="标题"
    />
    <JvTableContainer
      :data-source="dataSource"
      :columns="columns"
      :row-height="rowHeight"
      :height="height || 'fit-content'"
      @row-click="emit('rowClick', $event)"
    >
      <template #row="{ key: rowKey, row, rowIndex, columns }">
        <RenderRow :key="rowKey" :row="row" :row-index="rowIndex" :columns="columns">
          <template #cell="{ key: cellKey, column, row: cellRow, rowIndex: cellRowIndex, columnIndex }">
            <component
              :is="h(RenderCell, {
                key: cellKey,
                row: cellRow,
                rowIndex: cellRowIndex,
                column,
                columnIndex,
              }, {
                default: $slots.cell,
              })"
            />
          </template>
        </RenderRow>
      </template>
    </JvTableContainer>
    <JvTableFooter
      :pagination="pagination"
    />
  </div>
</template>
