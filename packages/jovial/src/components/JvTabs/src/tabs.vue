/**
支持多种标签页位置：顶部、右侧、底部、左侧
支持多种标签页类型：线条、卡片、分段
支持可关闭标签页
支持添加标签页
5. 支持自定义标签页标题和内容
支持禁用标签页
完整的动画效果
*/

<script setup lang="ts">
import type { JvTabsEmits, JvTabsProps, JvTabsSlots, TabPane } from './tabs'
import JvIcon from '@components/JvIcon'
import { createNamespace } from '@jovial/utils'
import { computed, ref, watch } from 'vue'
import '../style/style.css'

defineOptions({ name: 'JvTabs' })

const props = withDefaults(defineProps<JvTabsProps>(), {
  modelValue: '',
  items: () => [],
  position: 'top',
  type: 'line',
  closable: false,
  addable: false,
})

const emit = defineEmits<JvTabsEmits>()
defineSlots<JvTabsSlots>()
const bem = createNamespace('tabs')

// 标签页列表容器
const navRef = ref<HTMLElement | null>(null)
// 激活标签指示器
const indicatorRef = ref<HTMLElement | null>(null)
// 当前激活的标签页
const activeKey = ref(props.modelValue)

// 计算容器类名
const containerClass = computed(() => [
  bem.b(),
  bem.m(props.position),
  bem.m(props.type),
])

// 计算标签页样式
function getTabStyle(item: TabPane) {
  const style: Record<string, string> = {}

  if (item.key === activeKey.value) {
    style.color = 'var(--jv-color-primary)'
  }

  return style
}

// 更新指示器位置
function updateIndicator() {
  if (!navRef.value || !indicatorRef.value || props.type !== 'line')
    return

  const nav = navRef.value
  const indicator = indicatorRef.value
  const activeTab = nav.querySelector(`[data-key="${activeKey.value}"]`) as HTMLElement

  if (activeTab) {
    const isHorizontal = ['top', 'bottom'].includes(props.position)

    if (isHorizontal) {
      indicator.style.width = `${activeTab.offsetWidth}px`
      indicator.style.transform = `translateX(${activeTab.offsetLeft}px)`
    }
    else {
      indicator.style.height = `${activeTab.offsetHeight}px`
      indicator.style.transform = `translateY(${activeTab.offsetTop}px)`
    }
  }
}

// 处理标签页点击
function handleTabClick(item: TabPane) {
  if (item.disabled)
    return

  activeKey.value = item.key
  emit('update:modelValue', item.key)
  emit('click', item.key, item)
}

// 处理标签页关闭
function handleTabClose(item: TabPane, event: Event) {
  event.stopPropagation()
  emit('close', item.key, item)
}

// 处理添加标签页
function handleAdd() {
  emit('add')
}

// 监听激活标签页变化
watch(
  () => props.modelValue,
  (val) => {
    activeKey.value = val
    updateIndicator()
  },
)

// 监听标签页列表变化
watch(
  () => props.items,
  () => {
    updateIndicator()
  },
)
</script>

<template>
  <div :class="containerClass">
    <!-- 标签页导航 -->
    <div
      ref="navRef"
      :class="bem.e('nav')"
    >
      <div
        v-for="item in items"
        :key="item.key"
        :class="[
          bem.e('tab'),
          bem.is('active', item.key === activeKey),
          bem.is('disabled', item.disabled),
        ]"
        :style="getTabStyle(item)"
        :data-key="item.key"
        @click="handleTabClick(item)"
      >
        <!-- 自定义标签页标题 -->
        <template v-if="$slots.label">
          <slot
            name="label"
            :item="item"
          />
        </template>

        <!-- 默认标签页标题 -->
        <template v-else>
          <JvIcon
            v-if="item.icon"
            :name="item.icon"
            :class="bem.e('icon')"
          />
          <span :class="bem.e('label')">
            {{ item.label }}
          </span>
        </template>

        <!-- 关闭按钮 -->
        <JvIcon
          v-if="(closable || item.closable) && !item.disabled"
          name="close"
          :class="bem.e('close')"
          @click="handleTabClose(item, $event)"
        />
      </div>

      <!-- 添加按钮 -->
      <JvIcon
        v-if="addable"
        name="plus"
        :class="bem.e('add')"
        @click="handleAdd"
      />

      <!-- 激活指示器 -->
      <div
        v-if="type === 'line'"
        ref="indicatorRef"
        :class="bem.e('indicator')"
      />
    </div>

    <!-- 标签页内容 -->
    <div :class="bem.e('content')">
      <template
        v-for="item in items"
        :key="item.key"
      >
        <div
          v-show="item.key === activeKey"
          :class="bem.e('pane')"
        >
          <!-- 自定义内容 -->
          <template v-if="$slots.default">
            <slot
              name="default"
              :item="item"
            />
          </template>

          <!-- 默认内容 -->
          <template v-else>
            <template v-if="typeof item.content === 'function'">
              <component :is="item.content" />
            </template>
            <template v-else>
              {{ item.content }}
            </template>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
