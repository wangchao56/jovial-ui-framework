<script setup lang="ts">
import JvCheckbox from '@components/JvCheckbox'
import JvIcon from '@components/JvIcon'
import { createNamespace } from '@jienix/utils'
import { computed } from 'vue'
import { treeNodeEmits, treeNodeProps } from './tree'
import JvTreeNodeContent from './tree-node-content'

defineOptions({
  name: 'JvTreeNode',
  inheritAttrs: false,
})
const props = defineProps(treeNodeProps)
const emit = defineEmits(treeNodeEmits)

const bem = createNamespace('tree-node')

const loading = computed(() => props.loadingKeys.has(props.node.key))
// 是否选中
const isSelected = computed(() => props.selectedKeys.includes(props.node.key))
function handleSelect() {
  if (!props.selectable) {
    console.warn('Node is not selectable.') // 添加日志记录
    return
  }
  if (props.node.disabled) {
    console.warn('Node is disabled and cannot be selected.') // 添加日志记录
    return
  }
  emit('select', props.node)
}

function handleCheckboxChange(_checked: boolean) {
  emit('check', props.node, _checked)
}
// 注入
</script>

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
        <JvIcon v-if="!loading" color="gray" size="24" name="$chevronRight" />
        <JvIcon v-else color="gray" size="24" name="$loading" />
      </span>
      <!-- select-icon -->
      <!-- <span v-if="selectable" :class="bem.e('select-icon')"></span> -->
      <!-- 前缀 -->
      <JvCheckbox
        v-if="showCheckbox"
        :model-value="props.checked"
        :disabled="disabled"
        :indeterminate="indeterminate"
        @change="handleCheckboxChange"
      />
      <!-- label渲染 -->
      <span :class="[bem.e('label')]" @click="handleSelect"><JvTreeNodeContent :node="props.node" /></span>

      <!-- 后缀 -->
      <slot name="suffix" />
    </div>
  </div>
</template>
