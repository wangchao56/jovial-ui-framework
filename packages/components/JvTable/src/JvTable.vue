<script setup lang="ts">
import { createNamespace } from '@jienix/utils'
import { useTemplateRef } from 'vue'
import { jvTableProps } from './JvTable'
import JvTableColumn from './JvTableColumn.vue'
import JvTableFooter from './JvTableFooter.vue'
import JvTableHeader from './JvTableHeader.vue'

defineOptions({ name: 'JvTable' })
defineProps(jvTableProps)
const bem = createNamespace('table')
const tableRef = useTemplateRef('table')

defineExpose({
  tableRef,
})
</script>

<template>
  <div ref="table" :class="bem.b()">
    <JvTableHeader :columns="columns" title="标题" />
    <slot>
      <JvTableColumn v-for="column in columns" :key="column.key" :column="column" />
    </slot>
    <JvTableFooter :pagination="pagination" />
  </div>
</template>
