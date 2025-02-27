<script setup lang='ts'>
import { createNamespace } from '@jovial/utils'
import { provideTheme } from '../../theme'

defineOptions({ name: 'JvApp' })
const props = defineProps({
  theme: {
    type: String,
    default: 'light',
  },
})
const bem = createNamespace('application')
const theme = provideTheme(props)
</script>

<template>
  <div :class="[bem.b(), theme.themeClasses.value]">
    <slot />
  </div>
</template>

<style lang="css" scoped>
@b application {
  display: flex;
  background-color: rgb(var(--jv-theme-background));
  color: rgb(var(--jv-theme-on-background) var(--jv-high-emphasis-opacity, 1));
}
</style>
