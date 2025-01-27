<script setup lang="ts">
import type { MenuItem } from '../types'
import { inject } from 'vue'
import { JvMenuContextKey } from '../JvMenu'
import { ItemType } from '../types'
import JvMenuDivider from './JvMenuDivider'
import JvMenuGroup from './JvMenuGroup'
import JvMenuItem from './JvMenuItem'
import JvSubMenu from './JvSubMenu'

defineProps<{
  items: MenuItem[]
}>()

const menuContext = inject(JvMenuContextKey)

if (!menuContext) {
  throw new Error('JvMenuChildren 必须在 JvMenu 组件内使用')
}
</script>

<template>
  <template v-for="item in items" :key="item.key">
    <JvMenuItem
      v-if="item.type === ItemType.Item"
      :record="item"
      :label="item.label"
      :icon="item.icon"
      :disabled="item.disabled"
    />
    <JvSubMenu
      v-else-if="item.type === ItemType.SubMenu"
      :record="item"
      :label="item.label"
      :icon="item.icon as string"
    />
    <JvMenuGroup
      v-else-if="item.type === ItemType.Group"
      :record="item"
      :label="item.label"
      :children="item.children || []"
    />
    <JvMenuDivider
      v-else-if="item.type === ItemType.Divider"
      :dashed="item.dashed"
    />
    <div v-else />
  </template>
</template>

<style>
.jv-menu-children {
  padding: 0;
}
</style>
