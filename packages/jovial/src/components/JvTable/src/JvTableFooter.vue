<script setup lang="ts">
import type { PaginationConfig } from './JvTable'
import JvPagination from '@components/JvPagination/src/JvPagination.vue'
import { createNamespace } from '@jovial/utils'
import { computed } from 'vue'

const props = defineProps<{
  pagination?: PaginationConfig | boolean
}>()

// eslint-disable-next-line unused-imports/no-unused-vars
const emit = defineEmits<{
  (e: 'pageChange', page: number, pageSize: number): void
}>()

const bem = createNamespace('table')

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
</script>

<template>
  <footer
    v-if="internalPagination"
    role="rowgroup"
    :class="bem.b('footer')"
  >
    表格底部
    <JvPagination
      v-model="internalPagination.current"
      :total="internalPagination.total"
      :page-size="internalPagination.pageSize"
    />
  </footer>
</template>

<style lang="post" scoped>
@b table-footer {
  display: flex;
  justify-content: flex-end;
  padding: 12px;
}
</style>
