<script>
export default {
  name: 'StoryWrapper',
  props: {
    themeName: {
      type: String,
      default: 'light',
    },
  },
}
</script>

<template>
  <jv-app :theme="themeName">
    <slot name="story" />
  </jv-app>
</template>
