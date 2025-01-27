<script setup lang="ts">
import { ref } from 'vue'
import JvApp from './components/JvApp/src/JvApp.vue'
import { useTheme } from './components/theme'
import TestJvMenu from './pages/test-jvmenu.vue'

const themeName = ref('light')
const theme = useTheme()

function toggleTheme() {
  const newTheme = theme.name.value === 'light' ? 'dark' : 'light'
  theme.switch(newTheme)
}
// 监控 webstorage 的变化
window.addEventListener('storage', (event) => {
  console.log('storage', event)
  themeName.value = localStorage.getItem('theme') ?? 'light'
})
</script>

<template>
  <JvApp :theme="themeName">
    <JvButton @click="toggleTheme">
      {{ theme.name.value === 'light' ? '切换到暗色主题 🌙' : '切换到亮色主题 ☀️' }}
    </JvButton>
    <TestJvMenu />
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
