<script lang="ts" setup>
import JvLoadingBar from '@components/JvLoading/src/JvLoadingBar.vue'
import { useTheme } from '@components/theme'
import { createNamespace } from '@jovial/utils'
import { ref } from 'vue'
import '../style/app.css'

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
      theme.themeClasses.value,
    ]"
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
