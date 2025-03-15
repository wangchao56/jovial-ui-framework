<script setup lang="ts">
import JvIcon from '@components/JvIcon'
import { createNamespace } from '@jienix/utils'
import { computed, inject, normalizeClass } from 'vue'
import { type JvListContext, JvListContextKey } from './JvList'
import JvListChildren from './JvListChildren.vue'
import { jvListGroupProps } from './types'

defineOptions({
  name: 'JvListGroup',
  inheritAttrs: false,
})

const props = defineProps(jvListGroupProps)

const bem = createNamespace('list-group')
const { props: listProps, ...listContext } = inject(JvListContextKey, null) as JvListContext
const instance = getCurrentInstance()
const instanceKey = instance?.vnode.key as string

// 使用 expandedKeys 来控制展开状态
const isExpanded = computed(() => {
  return listContext?.expandedKeys.value.includes(instanceKey) || false
})

function toggleExpand() {
  if (!listContext) {
    return
  }
  const index = listContext.expandedKeys.value.indexOf(instanceKey)
  if (index === -1) {
    listContext.onExpanded(instanceKey, true)
  }
  else {
    listContext.onExpanded(instanceKey, false)
  }
}

const activeIcon = computed(() => {
  const collapseIcon = unref(listProps.collapseIcon) || props.collapseIcon
  const expandIcon = unref(listProps.expandIcon) || props.expandIcon
  return isExpanded.value ? collapseIcon : expandIcon
})
</script>

<template>
  <li :class="bem.b()">
    <div :class="bem.e('header')" @click="toggleExpand">
      <div :class="bem.e('title')">
        {{ props.title }}
      </div>
      <div :class="bem.e('action')">
        <JvIcon :name="activeIcon" :class="normalizeClass([bem.e('icon'), { 'is-expanded': isExpanded }])" />
      </div>
    </div>
    <div v-show="isExpanded" :class="bem.e('children')">
      <ul :class="bem.e('children-list')">
        <slot>
          <JvListChildren v-for="child in children" :key="child.key" :item="child" :level="1" :type="child.type" />
        </slot>
      </ul>
    </div>
  </li>
</template>
