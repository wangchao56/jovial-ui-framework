<script setup lang="ts">
import type { MenuItem } from '@components/JvMenu/src/types'
import JvMenu from '@components/JvMenu'
import { ItemType } from '@components/JvMenu/src/types'
import { ref } from 'vue'

const selectedKeys = ref<PropertyKey[]>(['1'])
const openKeys = ref<PropertyKey[]>([])
const defaultOpenKeys = ref(['sub1'])

const items: MenuItem[] = [
  {
    type: ItemType.Item,
    key: '1',
    label: '导航 1',
    icon: 'mdi:home',
  },
  {
    type: ItemType.SubMenu,
    key: 'sub1',
    label: '导航 2',
    icon: 'mdi:cog-sync',
    children: [
      {
        type: ItemType.Item,
        key: '2-1',
        label: '选项 1',
      },
      {
        type: ItemType.Item,
        key: '2-2',
        label: '选项 2',
      },
    ],
  },
  {
    type: ItemType.Divider,
    key: 'divider-1',
  },
  {
    type: ItemType.Group,
    key: 'g1',
    label: '分组 1',
    children: [
      {
        type: ItemType.Item,
        key: '3-1',
        label: '选项 3-1',
      },
      {
        type: ItemType.Item,
        key: '3-2',
        label: '选项 3-2',
        disabled: true,
      },
    ],
  },
]
</script>

<template>
  <div class="test-menu-page">
    <h2>菜单测试</h2>

    <div class="menu-container">
      <h3>垂直菜单</h3>
      <JvMenu
        v-model:selected-keys="selectedKeys"
        v-model:open-keys="openKeys"
        mode="vertical"
        trigger="hover"
        :default-open-keys="defaultOpenKeys"
        :items="items"
      />
    </div>

    <!-- <div class="menu-container">
      <h3>水平菜单</h3>
      <JvMenu
        v-model:selected-keys="selectedKeys"
        mode="horizontal"
        :items="items"
        @select="handleSelect"
      />
    </div>

    <div class="menu-container">
      <h3>暗色主题</h3>
      <JvMenu
        v-model:selected-keys="selectedKeys"
        theme="dark"
        :items="items"
        @select="handleSelect"
      />
    </div> -->
  </div>
</template>

<style scoped>
.test-menu-page {
  padding: 20px;
}

.menu-container {
  margin: 20px 0;
  border: 1px solid #eee;
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
  color: var(--jv-text-color);
}

h3 {
  margin-bottom: 16px;
  color: var(--jv-text-color-secondary);
}
</style>
