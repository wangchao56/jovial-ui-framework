<script setup lang="ts">
import type { JvTableColumn } from '@/components/JvTable'
import JvTable from '@/components/JvTable/src/JvTable.vue'
import { createNamespace } from '@jovial/utils'
import { ref } from 'vue'

defineOptions({ name: 'TestTable' })
const bem = createNamespace('test-table')
const dataSource = ref([
  { name: 'John', age: 30, city: 'New York' },
  { name: 'Jane', age: 25, city: 'Los Angeles' },
  { name: 'Jim', age: 35, city: 'Chicago' },
])
const columns = ref<JvTableColumn[]>([
  { title: 'Name', dataIndex: 'name', key: 'name', width: 100, fixed: 'left' },
  { title: 'Age', dataIndex: 'age', key: 'age', width: 100 },
  { title: 'City', dataIndex: 'city', key: 'city', width: 100, fixed: 'right' },
])
function handleRowClick(row: any) {
  console.log(row)
}
function handleSortChange(column: any) {
  console.log(column)
}
</script>

<template>
  <div :class="bem.b()">
    <JvTable
      :data-source="dataSource" :columns="columns" :height="500" @row-click="handleRowClick"
      @sort-change="handleSortChange"
    />
  </div>
</template>
