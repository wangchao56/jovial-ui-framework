<template>
  <i :class="bem.b()" :style="style">
    <slot></slot>
  </i>
</template>

<script setup lang="ts">
import { createNamespace } from "@jovial/utils/create";
import { computed } from "vue";
import { iconProps } from "./icon";
defineOptions({ name: "jv-icon" });

const bem = createNamespace("icon");

const props = defineProps(iconProps);

const style = computed(() => {
  const result = {} as Record<string, string>;

  if (props.color) {
    result.color = props.color;
  }

  if (props.size) {
    result.fontSize = `${props.size}px`;
    result.lineHeight = `${props.size}px`;
    result.width = `${props.size}px`;
  }

  return result;
});
</script>

<style lang="scss" scoped></style>
