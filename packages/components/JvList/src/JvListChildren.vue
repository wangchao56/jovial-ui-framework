<script setup lang="ts">
import type { ListGroupType, ListItem, SubHeaderType } from './types'
import JvDivider from '@components/JvDivider'
import JvListGroup from './JvListGroup.vue'
import JvListItem from './JvListItem.vue'
import JvListSubheader from './JvListSubheader.vue'

defineOptions({
  name: 'JvListChildren',
  inheritAttrs: false,
})

defineProps({
  item: {
    type: Object as PropType<ListItem>,
    default: () => ({}),
  },
  level: {
    type: Number,
    default: 0,
  },
  type: {
    type: String as PropType<'item' | 'group' | 'divider' | 'subheader'>,
    default: 'item',
  },
})

// 类型守卫函数
function isGroupType(item: ListItem): item is ListGroupType {
  return item.type === 'group'
}

function isSubheaderType(item: ListItem): item is SubHeaderType {
  return item.type === 'subheader'
}
</script>

<template>
  <JvListItem v-if="type === 'item'" v-bind="item.props" :meta-raw="item" />
  <JvListGroup
    v-else-if="type === 'group' && isGroupType(item)"
    :title="item.title"
    :item="item"
  />
  <JvListSubheader
    v-else-if="type === 'subheader' && isSubheaderType(item)"
    :title="item.title"
  />
  <JvDivider v-else-if="type === 'divider'" v-bind="item" />
</template>
