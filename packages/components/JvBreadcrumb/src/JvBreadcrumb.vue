<script setup lang="ts">
import JvIcon from '@components/JvIcon'
import { createNamespace } from '@jienix/utils'
import { type BreadcrumbItem, type JvBreadcrumbEmits, jvBreadcrumbProps, type JvBreadcrumbSlots } from './JvBreadcrumb'
import '../style/style.css'

defineOptions({ name: 'JvBreadcrumb' })
defineProps(jvBreadcrumbProps)

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
