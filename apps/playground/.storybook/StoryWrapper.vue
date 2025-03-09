<script>
import JvApp from '@jienix/jovial-components/src/JvApp/src/JvApp.vue'

export default {
  name: 'StoryWrapper',
  components: {
    JvApp,
  },
  props: {
    themeName: {
      type: String,
      default: 'light',
    },
  },
}
</script>

<template>
  <JvApp :theme="themeName">
    <slot name="story" />
  </JvApp>
</template>
