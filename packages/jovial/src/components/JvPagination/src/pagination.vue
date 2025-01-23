<script setup lang="ts">
/**
 * 分页组件，用于数据分页展示，支持以下功能：
 * 1. 基本的页码导航
 * 2. 上一页/下一页按钮
 * 3. 显示总条目数
 * 4. 每页条数选择器
 * 5. 快速跳转
 * 6. 简单模式
 * 7. 自定义内容插槽
 * 8. 完整的禁用状态支持
 */

import type { JvPaginationEmits, JvPaginationProps, JvPaginationSlots } from './pagination'
import JvIcon from '@components/JvIcon'
import { createNamespace } from '@jovial/utils'
import { computed, ref, watch } from 'vue'
// 暂时注释掉 Select 组件的引用，等 Select 组件完成后再启用
// import JvSelect from '@components/JvSelect'
import '../style/style.css'

defineOptions({ name: 'JvPagination' })

const props = withDefaults(defineProps<JvPaginationProps>(), {
  modelValue: 1,
  total: 0,
  pageSize: 10,
  pagerCount: 7,
  showQuickJumper: false,
  showSizeChanger: false,
  pageSizeOptions: () => [10, 20, 50, 100],
  showTotal: false,
  disabled: false,
  simple: false,
})

const emit = defineEmits<JvPaginationEmits>()
defineSlots<JvPaginationSlots>()
const bem = createNamespace('pagination')

// 当前页码
const currentPage = ref(props.modelValue)
// 跳转页码输入框
const jumpPage = ref('')

const pageSize = ref(props.pageSize)
// 总页数
const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

// 显示的页码范围
const pageRange = computed(() => {
  const { pagerCount, simple } = props
  const current = currentPage.value
  const total = totalPages.value

  if (simple) {
    return [current]
  }

  const half = Math.floor((pagerCount - 1) / 2)
  let start = Math.max(1, current - half)
  const end = Math.min(total, start + pagerCount - 1)

  if (end - start + 1 < pagerCount) {
    start = Math.max(1, end - pagerCount + 1)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

// 当前显示的条目范围
const itemRange = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize + 1
  const end = Math.min(currentPage.value * props.pageSize, props.total)
  return [start, end] as [number, number]
})

// 是否显示上一页
const showPrev = computed(() => currentPage.value > 1)

// 是否显示下一页
const showNext = computed(() => currentPage.value < totalPages.value)

// 处理页码改变
function handlePageChange(page: number) {
  if (page === currentPage.value || page < 1 || page > totalPages.value) {
    return
  }

  currentPage.value = page
  emit('update:modelValue', page)
  emit('change', page, props.pageSize)
}

// 处理每页条数改变
function handleSizeChange(size: number) {
  emit('update:pageSize', size)
  // 重新计算当前页码，确保不超出范围
  const newTotal = Math.ceil(props.total / size)
  if (currentPage.value > newTotal) {
    handlePageChange(newTotal)
  }
}

// 处理快速跳转
function handleJump() {
  const page = Number(jumpPage.value)
  if (!Number.isNaN(page)) {
    handlePageChange(page)
  }
  jumpPage.value = ''
}

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (val) => {
    currentPage.value = val
  },
)
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.is('disabled', disabled),
      bem.is('simple', simple),
    ]"
  >
    <!-- 总数显示 -->
    <div
      v-if="showTotal"
      :class="bem.e('total')"
    >
      <template v-if="$slots.total">
        <slot
          name="total"
          :total="total"
          :range="itemRange"
        />
      </template>
      <template v-else>
        共 {{ total }} 条
      </template>
    </div>

    <!-- 每页条数选择器 -->
    <JvSelect
      v-if="showSizeChanger"
      v-model="pageSize"
      :options="pageSizeOptions.map((size: number) => ({
        value: size,
        label: `${size} 条/页`,
      }))"
      :disabled="disabled"
      :class="bem.e('size-changer')"
      @change="handleSizeChange"
    />

    <!-- 上一页 -->
    <div
      :class="[
        bem.e('prev'),
        bem.is('disabled', !showPrev),
      ]"
      @click="showPrev && handlePageChange(currentPage - 1)"
    >
      <template v-if="$slots.prev">
        <slot name="prev" />
      </template>
      <template v-else>
        <JvIcon name="chevron-left" />
      </template>
    </div>

    <!-- 页码 -->
    <div
      v-for="page in pageRange"
      :key="page"
      :class="[
        bem.e('page'),
        bem.is('active', page === currentPage),
      ]"
      @click="handlePageChange(page)"
    >
      <template v-if="$slots.page">
        <slot
          name="page"
          :page="page"
          :active="page === currentPage"
        />
      </template>
      <template v-else>
        {{ page }}
      </template>
    </div>

    <!-- 下一页 -->
    <div
      :class="[
        bem.e('next'),
        bem.is('disabled', !showNext),
      ]"
      @click="showNext && handlePageChange(currentPage + 1)"
    >
      <template v-if="$slots.next">
        <slot name="next" />
      </template>
      <template v-else>
        <JvIcon name="chevron-right" />
      </template>
    </div>

    <!-- 快速跳转 -->
    <div
      v-if="showQuickJumper"
      :class="bem.e('jumper')"
    >
      跳至
      <input
        v-model="jumpPage"
        type="text"
        :disabled="disabled"
        @keyup.enter="handleJump"
      >
      页
    </div>
  </div>
</template>
