<script setup lang="ts">
import type { ListItemType } from './types'
import { createNamespace } from '@jienix/utils'
import { provide } from 'vue'
import { JvListContextKey, type JvListEmits, jvListProps } from './JvList'
import JvListChildren from './JvListChildren.vue'

defineOptions({
  name: 'JvList',
  inheritAttrs: false,
})

const props = defineProps(jvListProps)
const emit = defineEmits<JvListEmits>()

const bem = createNamespace('list')
provide(JvListContextKey, {
  handleClickListItem: (val: ListItemType) => {
    emit('clickItem', val)
  },
  handleSelectListItem: (val: ListItemType) => {
    emit('selectItem', val)
  },
  indent: 24,
  items: [],
  props: toRefs(props),
})
</script>

<template>
  <ul :class="bem.b()">
    <JvListChildren v-for="item in items" :key="item.key" :item="item" :level="0" :type="item.type" />
  </ul>
</template>
