<script setup lang="ts">
import { createNamespace } from '@jovial/utils'

defineOptions({ name: 'JvMain' })

const bem = createNamespace('main')
</script>

<template>
  <main :class="bem.b()">
    <div :class="bem.e('wrapper')">
      <slot />
    </div>
  </main>
</template>

<style lang="postcss" scoped>
@b main {
  --min-height: calc(100vh - var(--jv-header-height));
  --jv-main-height: 100%;
  display: block;
  width: 100%;
  min-height: var(--min-height);
  height: max(var(--min-height), var(--jv-main-height));
  border: var(--jv-border-solid);
  z-index: 1 !important;
  grid-area: main;
  overflow: hidden;
  box-sizing: border-box;
  background-color: var(--jv-main-bg-color);

  @e wrapper {
    --jv-main-wrapper-padding: 16px;
    --jv-main-wrapper-width: 100%;
    --jv-main-wrapper-height: calc(100% - var(--jv-main-wrapper-padding) * 2);

    position: relative;
    width: var(--jv-main-wrapper-width);
    height: var(--jv-main-wrapper-height);
    border: var(--jv-border-solid);
    border-radius: var(--jv-main-border-radius);
    box-shadow: var(--jv-shadow);
    z-index: 2 !important;
    box-sizing: border-box;
    inset: var(--jv-main-wrapper-padding);
    max-width: calc(100% - var(--jv-main-wrapper-padding) * 2);
    background-color: #fff;
    overflow: auto;
  }
}
</style>
