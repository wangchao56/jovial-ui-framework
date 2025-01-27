<script setup lang="ts">
import type { ListItemType } from '@components/JvList'
import JvList from '@components/JvList'
import { ref } from 'vue'

const expandedKeys = ref<string[]>(['group1'])

const items: any[] = [
  {
    type: 'subheader',
    key: 'header1',
    title: '基础列表',
  },
  {
    type: 'item',
    key: '1',
    title: '基础列表项',
    subtitle: '这是一个副标题',
    description: '这是一段描述文本',
  },
  {
    type: 'divider',
    key: 'div1',
  },
  {
    type: 'subheader',
    key: 'header2',
    title: '带图标的列表',
    sticky: true,
  },
  {
    type: 'item',
    key: '2',
    title: '带图标的列表项',
    prependIcon: '$star',
    appendIcon: 'chevron-right',
  },
  {
    type: 'item',
    key: '3',
    title: '带头像的列表项',
    prependAvatar: 'https://picsum.photos/40',
  },
  {
    type: 'divider',
    key: 'div2',
  },
  {
    type: 'group',
    key: 'group1',
    title: '分组列表',
    props: {
      prependIcon: 'mdi:image-filter-drama',
    },
    children: [
      {
        type: 'item',
        key: '4-1',
        title: '分组子项 1',
        props: {
          prependIcon: 'mdi:image-filter-drama',
        },
      },
      {
        type: 'item',
        key: '4-2',
        title: '分组子项 2',
        props: {
          prependIcon: 'mdi:image-filter-drama',
        },
      },
    ],
  },
  {
    type: 'group',
    key: 'group2',
    title: '嵌套分组',
    children: [
      {
        type: 'item',
        key: '5-1',
        title: '嵌套子项 1',
        children: [
          {
            type: 'item',
            key: '5-1-1',
            title: '深层嵌套项',
          },
        ],
      },
      {
        type: 'group',
        key: '5-2',
        title: '嵌套子项 2',
        children: [
          {
            type: 'group',
            key: '5-2-1',
            title: '深层嵌套项',
          },
          {
            type: 'item',
            key: '5-2-2',
            title: '深层嵌套项 2',
          },
        ],
      },
    ],
  },
]

function handleClick(item: ListItemType) {
  console.log('clicked:', item)
}

function handleSelect(item: ListItemType) {
  console.log('selected:', item)
}

function handleExpand(key: string, expanded: boolean) {
  console.log('expand:', key, expanded)
}
</script>

<template>
  <div class="test-list">
    <h2>List 组件示例</h2>

    <div class="list-container">
      <JvList
        v-model:expanded-keys="expandedKeys"
        :items="items"
        bordered
        hoverable
        selectable
        show-divider
        :indent="24"
        @click-item="handleClick"
        @select-item="handleSelect"
        @expand="handleExpand"
      />
    </div>
  </div>
</template>

<style scoped>
.test-list {
  padding: 20px;
}

.list-container {
  max-width: 600px;
  margin: 20px auto;
  border: 1px solid var(--jv-border-color);
  border-radius: var(--jv-border-radius-medium);
  background-color: var(--jv-color-bg-light);
}

h2 {
  text-align: center;
  color: var(--jv-color-text-primary);
  margin-bottom: 20px;
}
</style>
