<script setup lang="ts">
import { ref } from 'vue'
import JvApp from './components/JvApp/src/JvApp.vue'
import { JvButton } from './components/JvButton'
import { useTheme } from './components/theme'
import TestTable from './pages/test-table.vue'

const themeName = ref('light')
const theme = useTheme()

function toggleTheme() {
  const newTheme = theme.name.value === 'light' ? 'dark' : 'light'
  theme.switch(newTheme)
}
// 监控 webstorage 的变化
window.addEventListener('storage', () => {
  themeName.value = localStorage.getItem('theme') ?? 'light'
})

const pRef = ref<HTMLElement>()
const isOpenTooltip = ref(false)
// 测试torefs是否具有响应性
const testContent = ref('当前方向bottom-start')
// eslint-disable-next-line unused-imports/no-unused-vars
function toggleTooltip() {
  // 测试torefs是否具有响应性
  testContent.value = '当前方向bottom-start 2323'
  isOpenTooltip.value = !isOpenTooltip.value
}
// eslint-disable-next-line unused-imports/no-unused-vars
function tooltipVisibleChange(_val: boolean) {
  console.log('tooltipVisibleChange', _val)
}
</script>

<template>
  <JvApp :theme="themeName">
    <JvContainer>
      <JvHeader>
        <JvSpace>
          <p ref="pRef" v-tooltip:right.click="{ content: '当前方向bottom-start' }">
            当前方向bottom-start
          </p>
          <!-- 切换主题 -->
          <JvButton @click="toggleTheme">
            切换主题
          </JvButton>
        </JvSpace>
      </JvHeader>
      <JvMain>
        <TestTable />
      </JvMain>
    </JvContainer>
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
