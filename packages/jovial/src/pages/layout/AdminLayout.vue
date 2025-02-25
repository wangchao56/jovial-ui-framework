<script setup lang="ts">
import JvMenu, { type MenuItem } from '@components/JvMenu'
import { JvAside, JvContainer, JvFooter, JvHeader, JvMain } from '@components/PageContainer'
import { RouterView } from 'vue-router'

defineOptions({
  name: 'AdminLayout',
})

const menuItems = ref<MenuItem[]>([])

onMounted(() => {
  menuItems.value = JSON.parse(localStorage.getItem('menuItems') || '[]')
})
</script>

<template>
  <JvContainer>
    <JvHeader>
      <JvSpace>
        <JvTitle>测试组件</JvTitle>
        <JvButton>测试按钮</JvButton>
      </JvSpace>
    </JvHeader>
    <JvAside>
      侧边栏菜单
      <JvMenu :items="menuItems" />
    </JvAside>
    <JvMain>
      <RouterView v-slot="{ Component }">
        <Transition mode="out-in" name="fade">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </JvMain>
    <JvFooter />
  </JvContainer>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
