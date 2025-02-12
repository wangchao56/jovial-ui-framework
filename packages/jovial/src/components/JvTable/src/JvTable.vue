<script setup lang="ts">
import type { JvTableColumn, JvTableEmits, JvTableExpose } from './JvTable'
import { createNamespace } from '@jovial/utils'
import { computed, ref, watch } from 'vue'
import { jvTableProps } from './JvTable'
import JvTableContainer from './JvTableContainer/index.vue'
import JvTableFooter from './JvTableFooter.vue'
import JvTableHeader from './JvTableHeader.vue'
import '../style/table.css'

defineOptions({ name: 'JvTable' })
const props = defineProps(jvTableProps)
const emit = defineEmits<JvTableEmits>()
const bem = createNamespace('table')

const containerRef = ref<HTMLElement>()
const scrollTop = ref(0)
const currentSort = ref<{ column?: JvTableColumn, order?: 'asc' | 'desc' }>({})

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
    if (containerRef.value) {
      containerRef.value.scrollTop = position
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

// 数据变化监听
watch(() => props.dataSource, () => {
  if (containerRef.value) {
    containerRef.value.scrollTop = 0
  }
})

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
</script>

<template>
  <div
    :class="bem.b()"
  >
    <JvTableHeader
      title="标题"
    />
    <JvTableContainer
      :data-source="dataSource"
      :columns="columns"
      :row-height="rowHeight"
      @row-click="emit('rowClick', $event)"
    >
      <template #row="slotProps">
        <slot name="row" v-bind="slotProps" />
      </template>
    </JvTableContainer>
    <JvTableFooter
      :pagination="pagination"
      @page-change="$emit('pageChange', $event)"
    />
  </div>
</template>

<style lang="post" scoped>
@b table {
  width: 360px;
  height: 300px;
  border: 1px solid rgb(140 140 140);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  overflow: hidden;
}
</style>
