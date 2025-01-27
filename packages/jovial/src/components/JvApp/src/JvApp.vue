<script lang="ts" setup>
import { createNamespace } from '@jovial/utils'
import { ref } from 'vue'
import JvLoadingBar from '../../JvLoading/src/JvLoadingBar.vue'
import { useTheme } from '../../theme'

defineOptions({ name: 'JvApp' })
withDefaults(defineProps<{
  theme?: string
}>(), {
  theme: 'light',
})
const bem = createNamespace('app')
const theme = useTheme()

const loading = ref(false)
const loadingPercentage = ref(0)
</script>

<template>
  <div
    :class="[
      bem.b(),
      theme.themeClasses,
    ]"
    style="view-transition-name: theme"
  >
    <JvLoadingBar
      v-if="loading"
      :percentage="loadingPercentage"
      :type="theme.name.value === 'light' ? 'primary' : 'success'"
      active
      shadow
    />
    <slot />
  </div>
</template>

<style lang="scss">
.jv-app {
  width: 100%;
  height: 100%;
}

::view-transition-old(theme) {
  animation: none;
  mix-blend-mode: normal;
  z-index: 1;
}

::view-transition-new(theme) {
  animation: none;
  mix-blend-mode: normal;
  z-index: 2;
}

::view-transition-old(theme) {
  animation: clip-out 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

::view-transition-new(theme) {
  animation: clip-in 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes clip-out {
  from {
    clip-path: circle(170% at var(--pointer-x, 50%) var(--pointer-y, 50%));
  }
  to {
    clip-path: circle(0% at var(--pointer-x, 50%) var(--pointer-y, 50%));
  }
}

@keyframes clip-in {
  from {
    clip-path: circle(0% at var(--pointer-x, 50%) var(--pointer-y, 50%));
  }
  to {
    clip-path: circle(170% at var(--pointer-x, 50%) var(--pointer-y, 50%));
  }
}

:root {
  &,
  &[class*='jv-theme'] {
    transition: background-color 1s cubic-bezier(0.4, 0, 0.2, 1);
    --pointer-x: 50%;
    --pointer-y: 50%;
  }
}
::view-transition-new(root) {
  mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="white"/></svg>')
    center / 0 no-repeat;
  animation: scale 1s;
}

::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: none;
  z-index: -1;
}
.dark::view-transition-new(root) {
  animation: scale 1s;
}

@keyframes scale {
  to {
    mask-size: 200vmax;
  }
}
</style>
