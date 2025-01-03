<template>
  <div class="container">
    <JvButton>按钮</JvButton>
    <JvCalendar v-model="date" title="测试日历" />
  </div>
</template>

<script setup lang="ts">
const date = ref(new Date())

watch(date, (val) => {
  console.log(val)
})
</script>

<style lang="scss" scoped></style>
