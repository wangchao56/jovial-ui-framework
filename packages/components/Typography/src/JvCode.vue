<script setup lang="ts">
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.m(type),
      ...(collapsible ? [bem.m('collapsible')] : []),
    ]" :style="{
      fontSize: `${fontSize}px`,
      color,
    }"
  />
</template>
