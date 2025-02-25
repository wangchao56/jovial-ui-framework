<script setup lang="ts">
import type { MenuItem } from '../types'
import { ItemType } from '../types'
import JvMenuDivider, { type JvMenuDividerProps } from './JvMenuDivider'
import JvMenuGroup, { type JvMenuGroupProps } from './JvMenuGroup'
import JvMenuItem, { type JvMenuItemProps } from './JvMenuItem'
import JvSubMenu, { type JvSubMenuProps } from './JvSubMenu'

defineOptions({
  name: 'JvMenuChildren',
})

const props = defineProps<{
  items: MenuItem[]
}>()
const { items } = toRefs(props)

const componentMap = {
  [ItemType.Item]: JvMenuItem,
  [ItemType.SubMenu]: JvSubMenu,
  [ItemType.Group]: JvMenuGroup,
  [ItemType.Divider]: JvMenuDivider,
}

// 生成组件props
function getComponentProps(item: MenuItem) {
  switch (item.type) {
    case ItemType.Item:
      return { record: item, label: item.label, icon: item.icon, disabled: item.disabled } as JvMenuItemProps
    case ItemType.SubMenu:
      return { record: item, label: item.label, icon: item.icon } as JvSubMenuProps
    case ItemType.Group:
      return { record: item, label: item.label, children: item.children || [] } as JvMenuGroupProps
    case ItemType.Divider:
      return { dashed: item.dashed } as JvMenuDividerProps
    default:
      return { record: item }
  }
}
</script>

<template>
  <template v-for="item in items" :key="item.key">
    <component :is="componentMap[item.type]" v-bind="getComponentProps(item)" />
  </template>
</template>
