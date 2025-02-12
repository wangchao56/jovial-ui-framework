<script setup lang="ts">
import type { Slot } from 'vue'
import type { JvTableColumn } from '../JvTable'
import JvScrollPanel from '@/components/internal/JvScrollPanel.vue'
import { createNamespace } from '@jovial/utils'
import { useVirtualList } from '@vueuse/core'
import JvRenderCell from './renderCell.tsx'
import JvRenderRow from './renderRow.tsx'
import { JvTableContainerContextKey } from './types.ts'

defineOptions({ name: 'JvTableContainer' })
const props = defineProps<{
  dataSource: Record<string, any>[]
  columns: JvTableColumn[]
  rowHeight: number
}>()

// eslint-disable-next-line unused-imports/no-unused-vars
const emit = defineEmits<{
  (e: 'rowClick', row: any): void
}>()
defineSlots<{
  cell: Slot<{ record: Record<string, any>, column: JvTableColumn }>
}>()

const { dataSource, columns, rowHeight } = toRefs(props)

const bem = createNamespace('table')

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
  scrollState.scrollX = pos.x
  scrollState.scrollY = pos.y
}

function handleScrollEnd() {
  scrollState.isScroll = false
}
provide(JvTableContainerContextKey, {
  scrollState: toRef(scrollState),
})
</script>

<template>
  <main :class="bem.b('container')" :style="containerProps">
    <JvScrollPanel
      :class="bem.e('scroll-panel')" width="300" height="200"
      :scroll-mode="{
        vertical: true,
        horizontal: true,
      }"
      click
      scrollbar
      @scroll-start="handleScrollStart"
      @scroll="handleScroll"
      @scroll-end="handleScrollEnd"
    >
      <table :class="bem.e('native')">
        <colgroup>
          <col
            v-for="(col, idx) in columns"
            :key="col.key"
            :span="1"
            :class="bem.e(`col-${idx}`)"
          >
        </colgroup>
        <thead :class="bem.e('thead')">
          <tr :class="bem.e('row')">
            <th
              v-for="col in columns"
              :key="col.key"
              :class="bem.e('cell')"
            >
              {{ col.title }}
            </th>
          </tr>
        </thead>
        <tbody
          role="rowgroup"
          :class="bem.e('tbody')"
        >
          <JvRenderRow
            v-for="(record, index) in dataSource"
            :key="record.id"
            :record="record"
            :index="index"
            :columns="columns"
          >
            <template #cell="{ column }">
              <JvRenderCell :record="record" :column="column" />
            </template>
          </JvRenderRow>
        </tbody>
      </table>
    </JvScrollPanel>
  </main>
</template>

<style lang="post" scoped>
.jv-table__cell-0 {
  position: sticky;
  left: 0;
  z-index: 1;
  background-color: #1aad8b;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

@b table-container {
  width: 100%;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
  height: max-content;
}
@b table {
  @e native {
    width: 600px;
    border-collapse: collapse;
  }
  @e thead {
    background-color: #fafafa;
    & > .jv-table__row {
      & > .jv-table__cell {
        font-weight: 600;
        position: relative;
        &::after {
          content: '';
          display: block;
          width: 1px;
          height: 1.6em;
          background-color: #f0f0f0;
          position: absolute;
          right: 0;
          inset-inline-end: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  @e tbody {
    background-color: #fff;
    & > .jv-table__row {
      border-bottom: 1px solid #f0f0f0;
      &:hover {
        background-color: #f5f5f5;
      }
    }
  }

  @e cell {
    padding: 12px;
    flex-shrink: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 500;
  }
}
.jv-table__col-0 {
  background-color: #1aad8b;
}
.jv-table__col-1 {
  background-color: #1aad8b;
}
.jv-table__col-2 {
  background-color: #1aad8b;
}
</style>
