<script setup lang="ts">
import { JvApp } from 'jovial-ui'
import { ref } from 'vue'

const themeName = ref('light')
</script>

<template>
  <JvApp :theme="themeName">
    <RouterView />
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
