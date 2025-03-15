<script setup lang="ts">
import { normalizeClass, type Slot } from 'vue'
import { type JvTabsContext, jvTabsContextKey } from './JvTabs'

defineOptions({
  name: 'JvTabNavItem',
  inheritAttrs: false,
})

const { tabName, active } = defineProps({
  label: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  tabName: {
    type: String,
    default: '',
  },
})

defineSlots<{
  label?: Slot
}>()
const { changeActiveKey, closable, removeTab, bem } = inject(jvTabsContextKey) as JvTabsContext

function handleTabClose() {
  removeTab(tabName)
}

function handleTabClick() {
  changeActiveKey(tabName)
}
</script>

<template>
  <div
    :class="normalizeClass([bem.e('nav-item'), bem.is('active', active)])" role="tab" :aria-selected="active"
    :aria-controls="`jv-panel-${tabName}`" @click="handleTabClick"
  >
    <JvIcon v-if="icon" :name="icon" class="jv-tabs__nav-item__icon" />
    <!-- 自定义标签页标题 -->

    <span class="jv-tabs__nav-item__label">
      <slot name="label">{{ label }} </slot>
    </span>

    <!-- 关闭按钮 -->
    <JvButton
      v-if="closable && !disabled" icon="$close" variant="plain" class="jv-tabs__nav-item__close"
      @click="handleTabClose"
    />
    <!-- 激活指示器 -->
    <span v-if="active" class="jv-tabs__nav-item__indicator" />
  </div>
</template>
