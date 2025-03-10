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
</script>

<template>
  <JvApp :theme="themeName">
    <JvButton type="primary" @click="handleClick">
      按钮
    </JvButton>
    <JvAlert v-model:visible="visible" type="success" variant="filled" title="成功" dismissible message="这是一个成功提示" />
    <JvAlert v-model:visible="visible2" variant="outlined" type="success" title="成功" dismissible message="这是一个成功提示" />
    <JvAlert type="success" title="成功" dismissible message="这是一个成功提示" variant="outlined" />
    <JvAlert type="warning" title="警告" dismissible message="这是一个警告提示" variant="outlined" />
    <JvAlert type="error" title="错误" dismissible message="这是一个错误提示" variant="outlined" />
    <JvAlert type="info" title="信息" dismissible message="这是一个信息提示" variant="outlined" />
    <JvAlert type="info" title="信息" dismissible message="这是一个信息提示" variant="filled" />
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
