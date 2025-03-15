<script setup lang="ts">
import type { JvTabPaneProps, JvTabsContext } from './JvTabs'
import JvIcon from '@components/JvIcon'
import JvTabNavItem from './JvTabNavItem.vue'
import { jvTabsContextKey } from './JvTabs'

defineOptions({
  name: 'JvTabNav',
  inheritAttrs: false,
})

const { tabs } = defineProps<{
  tabs: JvTabPaneProps[]
}>()

const { activeKey, bem, addable } = inject(jvTabsContextKey) as JvTabsContext
</script>

<template>
  <div :class="bem.e('nav')">
    <div :class="bem.e('nav-list')" role="tablist" aria-label="标签页列表" :aria-activedescendant="activeKey">
      <slot v-for="item in tabs" :item="item">
        <JvTabNavItem v-bind="item" :tab-name="item.name" :active="item.name === activeKey" />
      </slot>
    </div>
    <div v-if="addable" :class="bem.e('nav-add')">
      <JvIcon name="$add" />
    </div>
  </div>
</template>
