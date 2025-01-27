<script setup lang='ts'>
import { useTheme } from '@/components/theme'

const theme = useTheme()

const curThemeModel = ref(theme.name.value)

function toggleTheme() {
  curThemeModel.value = curThemeModel.value === 'light' ? 'dark' : 'light'
}

watch(curThemeModel, (newVal) => {
  window.localStorage.setItem('theme', newVal)
  window.dispatchEvent(new Event('storage'))
})
</script>

<template>
  <JvRow>
    <JvCol>
      <JvButtonGroup>
        <JvButton type="primary" @click="toggleTheme">
          切换主题
        </JvButton>
        <JvButton>Button 2</JvButton>
        <JvButton>Button 3</JvButton>
      </JvButtonGroup>
    </JvCol>
  </JvRow>
</template>

<style  scoped>

</style>
