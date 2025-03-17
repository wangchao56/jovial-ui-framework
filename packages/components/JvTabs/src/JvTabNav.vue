<script setup lang="ts">
import { JvButton } from '@components/JvButton'
import { inject, nextTick, onMounted, ref, watch } from 'vue'
import JvTabNavItem from './JvTabNavItem.vue'
import { type JvTabPaneProps, type JvTabsContext, jvTabsContextKey, TabPositionEnum } from './JvTabs'

defineOptions({
  name: 'JvTabNav',
  inheritAttrs: false,
})

const props = defineProps<{
  tabs: JvTabPaneProps[]
}>()

const emit = defineEmits<{
  (e: 'add'): void
}>()

const { activeKey, addable, position, bem, type, align } = inject(jvTabsContextKey) as JvTabsContext
// 导航容器引用
const navRef = ref<HTMLElement | null>(null)

// 分段控制器滑动指示器相关
const segmentIndicatorStyle = ref({
  '--indicator-width': '0px',
  '--indicator-height': '0px',
  '--indicator-offset-x': '0px',
  '--indicator-offset-y': '0px',
})

// 更新分段控制器滑动指示器位置
function updateSegmentIndicator() {
  if (!navRef.value)
    return

  nextTick(() => {
    const activeItem = navRef.value?.querySelector(`.${bem.e('nav-item')}.${bem.is('active', true)}`) as HTMLElement
    let indicatorWidth = '0px'
    let indicatorOffsetX = '0px'
    let indicatorOffsetY = '0px'
    let indicatorHeight = '0px'

    switch (type.value) {
      case 'line':
        if (position.value === TabPositionEnum.TOP || position.value === TabPositionEnum.BOTTOM) {
          indicatorWidth = `${activeItem.offsetWidth}px`
          indicatorOffsetX = `${activeItem.offsetLeft}px`
          indicatorOffsetY = `0px`
          indicatorHeight = `2px`
        }
        if (position.value === TabPositionEnum.LEFT || position.value === TabPositionEnum.RIGHT) {
          indicatorWidth = `2px`
          indicatorOffsetX = `0px`
          indicatorOffsetY = `${activeItem.offsetTop}px`
          indicatorHeight = `${activeItem.offsetHeight}px`
        }
        break
      case 'card':
        if (position.value === TabPositionEnum.TOP || position.value === TabPositionEnum.BOTTOM) {
          indicatorWidth = `${activeItem.offsetWidth}px`
          indicatorOffsetX = `${activeItem.offsetLeft}px`
          indicatorHeight = `${activeItem.offsetHeight}px`
          indicatorOffsetY = `0px`
        }
        if (position.value === TabPositionEnum.LEFT || position.value === TabPositionEnum.RIGHT) {
          indicatorWidth = `${activeItem.offsetWidth}px`
          indicatorHeight = `${activeItem.offsetHeight}px`
          indicatorOffsetY = `${activeItem.offsetTop}px`
          indicatorOffsetX = `0px`
        }
        break
      case 'segment':
        if (position.value === TabPositionEnum.TOP || position.value === TabPositionEnum.BOTTOM) {
          indicatorWidth = `${activeItem.offsetWidth}px`
          indicatorOffsetX = `${activeItem.offsetLeft}px`
          indicatorHeight = `${activeItem.offsetHeight}px`
          indicatorOffsetY = `0px`
        }
        if (position.value === TabPositionEnum.LEFT || position.value === TabPositionEnum.RIGHT) {
          indicatorWidth = `${activeItem.offsetWidth}px`
          indicatorHeight = `${activeItem.offsetHeight}px`
          indicatorOffsetY = `${activeItem.offsetTop}px`
          indicatorOffsetX = `0px`
        }
        break
    }

    if (activeItem) {
      segmentIndicatorStyle.value = {
        '--indicator-width': indicatorWidth,
        '--indicator-height': indicatorHeight,
        '--indicator-offset-x': indicatorOffsetX,
        '--indicator-offset-y': indicatorOffsetY,
      }
    }
  })
}

// 监听activeKey变化，更新滑动指示器位置
watch(() => activeKey.value, () => {
  updateSegmentIndicator()
})

// 监听tabs变化，更新滑动指示器位置
watch(() => props.tabs, () => {
  updateSegmentIndicator()
}, { deep: true })

onMounted(() => {
  updateSegmentIndicator()
})

function handleAddTab() {
  emit('add')
}
</script>

<template>
  <div ref="navRef" :class="[bem.e('nav'), bem.m(align)]">
    <div :class="bem.e('nav-list')">
      <JvTabNavItem
        v-for="tab in tabs" :key="tab.name" :name="tab.name" :icon="tab.icon" :disabled="tab.disabled"
        :active="activeKey === tab.name" :closable="tab.closable" tabindex="0"
      >
        <template #label>
          <slot :name="`tab-${tab.name}`">
            {{ tab.name }}
          </slot>
        </template>
      </JvTabNavItem>
      <!-- 分段控制器滑动指示器 -->
      <div :class="bem.e('indicator')" :style="segmentIndicatorStyle" />
    </div>
    <!-- 添加按钮 -->
    <JvButton v-if="addable" icon="$plus" variant="plain" size="tiny" :class="bem.e('nav-add')" @click="handleAddTab" />
  </div>
</template>
