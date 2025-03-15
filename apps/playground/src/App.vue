<script setup lang="ts">
import type { ListItem } from '@jienix/jovial-components/JvList'
import { reactive, ref } from 'vue'

const themeName = ref('light')

const visible = ref(true)
const visible2 = ref(true)
const visible3 = ref(true)

function handleClick() {
  visible.value = !visible.value
  visible2.value = !visible2.value
  visible3.value = !visible3.value
}
const loading = ref(true)
setTimeout(() => {
  loading.value = false
}, 3000)

const items = reactive<ListItem[]>([
  {
    type: 'item',
    key: 'item1',
    prependIcon: '$chevronRight',
    title: '标题一',
    subtitle: '副标题',
    description: '描述',
  },
  {
    type: 'subheader',
    key: 'subheader',
    title: '子标题',
  },
  {
    type: 'item',
    key: 'item2',
    title: '标题二',
    subtitle: '副标题二',
    description: '描述二',
  },
  {
    type: 'item',
    key: 'item3',
    title: '标题三',
    subtitle: '副标题三',
    description: '描述三',
  },
  {
    type: 'divider',
    key: 'divider',
  },
  {
    type: 'group',
    key: 'group1',
    title: '组标题',
    children: [
      {
        type: 'item',
        key: 'item4',
        title: '标题四',
        subtitle: '副标题四',
        description: '描述四',
      },
      {
        type: 'item',
        key: 'item5',
        title: '标题五',
        subtitle: '副标题五',
        description: '描述五',
      },
      {
        type: 'group',
        key: 'group1-2',
        title: '组标题2',
        children: [
          {
            type: 'item',
            key: 'item6',
            title: '标题六',
            subtitle: '副标题六',
            description: '描述六',
          },
          {
            type: 'item',
            key: 'item7',
            title: '标题七',
            subtitle: '副标题七',
            description: '描述七',
          },
        ],
      },
    ],
  },
])
</script>

<template>
  <JvApp :theme="themeName" @change="handleClick">
    <JvList>
      <template v-for="item in items" :key="item.key">
        <JvListItem v-if="item.type === 'item'" v-bind="item" />
        <JvListSubheader v-else-if="item.type === 'subheader'" v-bind="item" />
        <JvListGroup v-else-if="item.type === 'group'" v-bind="item" />
        <JvDivider v-else-if="item.type === 'divider'" v-bind="item" />
      </template>
    </JvList>
  </JvApp>
</template>

<style>
.app {
  width: 100%;
  height: 100%;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
}

@keyframes fade-out {
  to {
    opacity: 0;
  }
}

@keyframes slide-from-right {
  from {
    transform: translateX(30px);
  }
}

@keyframes slide-to-left {
  to {
    transform: translateX(-30px);
  }
}

::view-transition-old(theme) {
  animation:
    90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
}

::view-transition-new(theme) {
  animation:
    210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
}

:root {
  &,
  &[class*='jv-theme'] {
    transition: background-color 0.3s ease;
  }
}
</style>
