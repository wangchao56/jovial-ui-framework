<script setup lang="ts">
import { JvButton } from '@components/JvButton'
import JvIcon from '@components/JvIcon'
import { normalizeClass, type Slot } from 'vue'
import { computed, inject } from 'vue'
import { type JvTabsContext, jvTabsContextKey } from './JvTabs'

defineOptions({
  name: 'JvTabNavItem',
  inheritAttrs: false,
})

const { name, icon, disabled, active, closable } = defineProps({
  name: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
    required: false,
  },
  active: {
    type: Boolean,
    default: false,
    required: true,
  },
  closable: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
    required: false,
  },
})

defineSlots<{
  label?: Slot
  icon?: Slot
}>()

const { closable: globalClosable, bem, changeActiveKey, removeTab } = inject(jvTabsContextKey) as JvTabsContext

// 是否可关闭 如果closable为undefined，则使用全局配置
const isClosable = computed(() => {
  return closable === undefined ? globalClosable.value : closable
})

const showClose = computed(() => {
  return !isClosable.value || !disabled
})

function handleTabClose(event: Event) {
  event.stopPropagation()
  removeTab(name)
}

function handleTabClick() {
  if (disabled)
    return
  changeActiveKey(name)
}

const navItemRef = ref<HTMLElement>()
onMounted(() => {
  console.log(isClosable.value)
})
</script>

<template>
  <div
    ref="navItemRef"
    :class="normalizeClass([
      bem.e('nav-item'),
      bem.is('active', active),
      bem.is('disabled', disabled),
      { [bem.m('closable')]: isClosable },
    ])" role="tab" v-bind="$attrs" :aria-selected="active" :aria-controls="`jv-panel-${name}`"
    :aria-disabled="disabled" @click="handleTabClick" @keydown.enter="handleTabClick"
  >
    <!-- 标签页图标 -->
    <slot name="icon">
      <JvIcon v-if="icon" :name="icon" :class="bem.e('nav-item__icon')" />
    </slot>

    <!-- 标签页标题 -->
    <span :class="bem.e('nav-item__label')">
      <slot name="label">{{ name }}</slot>
    </span>

    <!-- 关闭按钮 -->
    <JvButton
      v-if="showClose" icon="$close" variant="plain" size="tiny"
      :class="bem.e('nav-item__close')" @click="handleTabClose"
    />
  </div>
</template>
