<script setup lang="ts">
import { ref } from 'vue'

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

const tabs = [
  {
    name: '标签一',
    content: '标签一的内容',
  },
  {
    name: '标签二',
    content: '标签二的内容',
  },
  {
    name: '标签三',
    content: '标签三的内容',
  },
  {
    name: '标签四',
    content: '标签四的内容',
  },
  {
    name: '标签五',
    content: '标签五的内容',
  },
  {
    name: '标签六',
    content: '标签六的内容',
  },
  {
    name: '标签七',
    content: '标签七的内容',
  },
  {
    name: '标签八',
    content: '标签八的内容',
  },
  {
    name: '标签九',
    content: '标签九的内容',
  },
]
</script>

<template>
  <JvApp :theme="themeName" @change="handleClick">
    <JvButton icon="$close" variant="tonal" size="small" />
    <JvTabs closable :tabs="tabs" addable width="500px" align="center" />
    <!-- <JvTabs type="card" position="right">
      <JvTabPanel name="标签一" icon="mdi:home" content="标签一的内容" />
      <JvTabPanel name="标签二" icon="mdi:home" content="标签二的内容" />
      <JvTabPanel name="标签三" icon="mdi:home" content="标签三的内容" />
    </JvTabs>
    <JvTabs type="segment" position="right">
      <JvTabPanel name="标签一" icon="mdi:home" content="标签一的内容" />
      <JvTabPanel name="标签二" icon="mdi:home" content="标签二的内容" />
      <JvTabPanel name="标签三" icon="mdi:home" content="标签三的内容" />
    </JvTabs> -->
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
