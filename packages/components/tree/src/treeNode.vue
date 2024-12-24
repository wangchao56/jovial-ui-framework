<template>
  <div
    :class="[
      bem.b(),
      bem.is('selected', isSelected),
      bem.is('disabled', node.disabled),
    ]"
  >
    <div
      :class="[bem.e('content')]"
      :style="{ paddingLeft: `${node.level * 24}px` }"
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
        <JvIcon color="gray" size="24">
          <Switcher v-if="!loading" />
          <Loading v-else />
        </JvIcon>
      </span>
      <!-- select-icon-->
      <span v-if="selectable" :class="bem.e('select-icon')"></span>

      <span
        :class="[bem.e('label')]"
        @click="() => selectable && !node.disabled && emit('select', node)"
        >{{ node.label }}</span
      >
      <!-- 后缀 -->
      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from "@jovial/utils";
import { treeNodeEmits, treeNodeProps } from "./tree";
import JvIcon from "@jovial/components/icon";
import Loading from "./icons/Loading";
import Switcher from "./icons/Switcher";
import { computed } from "vue";

defineOptions({ name: "JvTreeNode" });
const props = defineProps(treeNodeProps);
const emit = defineEmits(treeNodeEmits);

const bem = createNamespace("tree-node");

const loading = computed(() => props.loadingKeys.has(props.node.key));
//是否选中
const isSelected = computed(() => props.selectedKeys.includes(props.node.key));
</script>

<style lang="scss" scoped></style>
