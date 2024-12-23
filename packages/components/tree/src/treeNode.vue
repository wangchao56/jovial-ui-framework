<template>
  <div :class="bem.b()">
    <div
      :class="bem.e('content')"
      :style="{ paddingLeft: `${node.level * 16}px` }"
    >
      <span
        :class="[
          bem.e('expand-icon'),
          bem.is('leaf', node.isLeaf),
          {
            expanded: expanded && !node.isLeaf,
          },
        ]"
        @click="() => emit('toggle', node)"
      >
        <JvIcon color="gray" size="16">
          <Switcher />
        </JvIcon>
      </span>
      <span :class="[bem.e('label')]">{{ node.label }}</span>
      <!-- 后缀 -->
      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from "@jovial/utils";
import { treeNodeEmits, treeNodeProps } from "./tree";
import JvIcon from "@jovial/components/icon";
import Switcher from "./icons/Switcher";

defineOptions({ name: "JvTreeNode" });
const props = defineProps(treeNodeProps);
console.log(props);
const emit = defineEmits(treeNodeEmits);

const bem = createNamespace("tree-node");
</script>

<style lang="scss" scoped></style>
