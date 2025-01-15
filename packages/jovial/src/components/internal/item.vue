<script setup lang="ts">
defineOptions({
  name: 'ListItem',
})
defineProps<{
  source: any
}>()

const itemStlye = computed(() => ({
  height: `${10 * Math.random() * 10}px`,
  minHeight: 'min-content',
  border: '1px solid #ccc',
}))
</script>

<template>
  <div :style="itemStlye" :data-index="source.index">
    <div class="head">
      <span>{{ source.id }}</span>
    </div>
    <div class="content">
      {{ source.name }}
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
