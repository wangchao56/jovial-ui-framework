<script setup lang="ts">
import JvPagination from '@components/JvPagination/src/JvPagination.vue'
import { createNamespace } from '@jovial/utils'
import { computed } from 'vue'
import { type PaginationConfig, useJvTableContext } from './JvTable'

const props = defineProps<{
  pagination?: PaginationConfig | boolean
}>()

const bem = createNamespace('table')

const { onPageChange } = useJvTableContext()
const internalPagination = computed(() => {
  const defaultConfig = {
    current: 1,
    pageSize: 10,
    total: 0,
    pageSizeOptions: [10, 20, 50, 100],
    showSizeChanger: true,
    showQuickJumper: false,
  }

  if (typeof props.pagination === 'boolean') {
    return props.pagination ? defaultConfig : null
  }
  return { ...defaultConfig, ...props.pagination }
})
function handlePageChange(page: number, pageSize: number, total: number) {
  onPageChange(page, pageSize, total)
}
</script>

<template>
  <footer
    v-if="internalPagination"
    role="rowgroup"
    :class="bem.b('footer')"
  >
    <slot name="footer">
      <JvPagination
        v-model="internalPagination.current"
        :total="internalPagination.total"
        :page-size="internalPagination.pageSize"
        @change="handlePageChange"
      />
    </slot>
  </footer>
</template>

<style lang="css" scoped>
@b table-footer {
  display: flex;
  justify-content: flex-end;
  padding: 12px;
}
</style>
