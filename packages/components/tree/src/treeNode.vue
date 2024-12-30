<template>
  <div
    :class="[
      bem.b(),
      bem.is('selected', isSelected),
      bem.is('disabled', node.disabled)
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
            expanded: expanded && !node.isLeaf
          }
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

      <span :class="[bem.e('label')]" @click="handleSelect"
        ><JvTreeNodeContent :node="props.node"
      /></span>

      <!-- 后缀 -->
      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { treeNodeEmits, treeNodeProps } from './tree'
import JvIcon from '@jovial/components/icon'
import Loading from './icons/Loading'
import Switcher from './icons/Switcher'
import { computed, inject } from 'vue'
import JvTreeNodeContent from './tree-node-content'

defineOptions({ name: 'JvTreeNode' })
const props = defineProps(treeNodeProps)
const emit = defineEmits(treeNodeEmits)

const bem = createNamespace('tree-node')

const loading = computed(() => props.loadingKeys.has(props.node.key))
//是否选中
const isSelected = computed(() => props.selectedKeys.includes(props.node.key))
const handleSelect = () => {
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

// 注入
</script>
