<script setup lang="ts">
import type { ScrollPanelExpose } from '@/components/internal/types.ts'
import type { Slot } from 'vue'
import type { JvTableColumn, JvTableColumnType } from '../JvTable'
import type { RenderCellScope, RenderRowScope } from './types.ts'
import JvScrollPanel from '@/components/internal/JvScrollPanel.vue'
import { createNamespace } from '@jovial/utils'
import { useVirtualList } from '@vueuse/core'
import RenderTbody from './renderTbody.tsx'
import RenderThead from './renderThead.tsx'
import { JvTableContainerContextKey } from './types'

defineOptions({ name: 'JvTableContainer' })
const props = defineProps<{
  dataSource: Record<string, any>[]
  columns: JvTableColumnType[]
  rowHeight: number
  height: number | string
}>()

// eslint-disable-next-line unused-imports/no-unused-vars
const emit = defineEmits<{
  (e: 'rowClick', row: any): void
}>()
defineSlots<{
  row: Slot<RenderRowScope<Record<string, any>>>
  cell: Slot<RenderCellScope<Record<string, any>>>
}>()

const { dataSource, columns, rowHeight } = toRefs(props)

const bem = createNamespace('table')

const initDataSourceResult = initDataSource(dataSource.value)
const flatColumns = initColumns(columns.value)
// 处理数据
function initDataSource(dataSource: Record<string, any>[]) {
  return dataSource.map((item) => {
    return {
      ...item,
    }
  })
}
// 处理columns 拍平 使用flat
function initColumns(columns: JvTableColumnType[]): JvTableColumn[] {
  return columns.flatMap((item) => {
    if ('children' in item) {
      return initColumns(item.children)
    }
    return item
  })
}

// eslint-disable-next-line unused-imports/no-unused-vars
const { list, containerProps, wrapperProps } = useVirtualList(dataSource.value, {
  itemHeight: rowHeight.value,
})
const scrollState = reactive({
  isScroll: false,
  scrollX: 0,
  scrollY: 0,
})
function handleScrollStart() {
  scrollState.isScroll = true
}

function handleScroll(pos: { x: number, y: number }) {
  scrollState.scrollX = Math.abs(pos.x)
  scrollState.scrollY = pos.y
}

function handleScrollEnd() {
  scrollState.isScroll = false
}

const scrollPanelRef = ref<ScrollPanelExpose>()

provide(JvTableContainerContextKey, {
  scrollState: toRef(scrollState),
})
</script>

<template>
  <main :class="bem.b('container')" :style="containerProps">
    <RenderThead :columns="columns" :scroll-x="scrollState.scrollX" :scroll-y="scrollState.scrollY" @scroll="handleScroll" />
    <JvScrollPanel
      ref="scrollPanelRef"
      :scroll-mode="{
        vertical: true,
        horizontal: true,
      }"
      :height="height"
      scrollbar
      @scroll-start="handleScrollStart"
      @scroll="handleScroll"
      @scroll-end="handleScrollEnd"
    >
      <RenderTbody :data="initDataSourceResult" :columns="flatColumns">
        <slot
          v-for="(record, index) in initDataSourceResult" :key="index" name="row" :row="record" :row-index="index"
          :columns="flatColumns"
        />
      </RenderTbody>
    </JvScrollPanel>
  </main>
</template>

<style lang="css" scoped>
@b table-container {
  width: 100%;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
  height: max-content;
}
</style>
