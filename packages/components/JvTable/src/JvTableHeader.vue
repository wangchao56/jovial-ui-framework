<script setup lang="ts">
import { createNamespace } from '@jienix/utils'

defineProps<{
  title: string
}>()
const bem = createNamespace('table')
</script>

<template>
  <header :class="bem.b('header')">
    <div :class="bem.e('title')">
      {{ title }}
    </div>
  </header>
</template>

<style lang="css" scoped>
@b table-header {
}

@b table {
  @e header {
    background-color: #fff;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  @e title {
    padding: 12px;
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
