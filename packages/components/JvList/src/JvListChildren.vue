<script setup lang="ts">
import type { DividerType, ListGroupType, ListItem, ListItemType, SubHeaderType } from './types'
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
})

// 类型守卫函数
function isGroupType(item: ListItem): item is ListGroupType {
  return item.type === 'group'
}
function isItemType(item: ListItem): item is ListItemType {
  return item.type === 'item'
}
function isSubheaderType(item: ListItem): item is SubHeaderType {
  return item.type === 'subheader'
}
function isDividerType(item: ListItem): item is DividerType {
  return item.type === 'divider'
}
</script>

<template>
  <JvListItem v-if="isItemType(item)" v-bind="item" :meta-raw="item" />
  <JvListGroup v-else-if="isGroupType(item)" :title="item.title" :children="item.children" />
  <JvListSubheader v-else-if="isSubheaderType(item)" :title="item.title" />
  <JvDivider v-else-if="isDividerType(item)" v-bind="item" />
</template>
