<script lang="ts" setup>
import JvLoading from '@components/JvLoading'
import { provideTheme, useTheme } from '@jienix/jovial-theme'
import { createNamespace } from '@jienix/utils'
import { ref } from 'vue'

defineOptions({ name: 'JvApp', inheritAttrs: false })
withDefaults(defineProps<{
  theme?: string
}>(), {
  theme: 'light',
})
const bem = createNamespace('app')
// use theme
const theme = useTheme()
// provide theme
provideTheme({ theme: theme.name.value })
const loading = ref(false)
const loadingPercentage = ref(0)
</script>

<template>
  <div
    :class="[
      bem.b(),
      theme.themeClasses.value,
    ]"
  >
    <JvLoading.Bar
      v-if="loading" :percentage="loadingPercentage"
      :type="theme.name.value === 'light' ? 'primary' : 'success'" active shadow
    />
    <slot />
  </div>
</template>
