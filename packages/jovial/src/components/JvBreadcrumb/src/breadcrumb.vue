/**
这个面包屑组件实现了以下功能：
支持基本的面包屑导航
支持图标
支持链接跳转
支持禁用状态
支持自定义分隔符
支持自定义内容
完整的类型定义和文档
*/

<script setup lang="ts">
import type { BreadcrumbItem, JvBreadcrumbEmits, JvBreadcrumbProps, JvBreadcrumbSlots } from './breadcrumb'
import JvIcon from '@components/JvIcon'
import { createNamespace } from '@jovial/utils'
import '../style/style.css'

defineOptions({ name: 'JvBreadcrumb' })
withDefaults(defineProps<JvBreadcrumbProps>(), {
  items: () => [],
  separator: '/',
  separatorIcon: '',
})

const emit = defineEmits<JvBreadcrumbEmits>()
defineSlots<JvBreadcrumbSlots>()
const bem = createNamespace('breadcrumb')

// 处理点击事件
function handleClick(item: BreadcrumbItem) {
  if (!item.disabled) {
    emit('click', item)
  }
}
</script>

<template>
  <div :class="bem.b()">
    <template
      v-for="(item, index) in items"
      :key="item.key"
    >
      <!-- 面包屑项 -->
      <div
        :class="[
          bem.e('item'),
          bem.is('disabled', item.disabled),
          bem.is('link', !!item.to && !item.disabled),
        ]"
        @click="handleClick(item)"
      >
        <!-- 自定义内容 -->
        <template v-if="$slots.item">
          <slot
            name="item"
            :item="item"
          />
        </template>

        <!-- 默认内容 -->
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
      </div>

      <!-- 分隔符 -->
      <div
        v-if="index < items.length - 1"
        :class="bem.e('separator')"
      >
        <!-- 自定义分隔符 -->
        <template v-if="$slots.separator">
          <slot name="separator" />
        </template>

        <!-- 默认分隔符 -->
        <template v-else>
          <JvIcon
            v-if="separatorIcon"
            :name="separatorIcon"
          />
          <template v-else>
            {{ separator }}
          </template>
        </template>
      </div>
    </template>
  </div>
</template>
