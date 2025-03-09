<script>
import JvApp from '@jienix/jovial-components/JvApp'

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
