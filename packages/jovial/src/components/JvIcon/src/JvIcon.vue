<script setup lang="ts">
import { internalIcons } from '@components/internal-icon'
import { Icon } from '@iconify/vue'
import { SizeOptions } from '@jovial/typings'
import { createNamespace, isNumberExcludeNaN, isString } from '@jovial/utils'
import { useDebounceFn } from '@vueuse/core'
import { computed, nextTick, ref, watch } from 'vue'
import { jvIconProps } from './icon'
import './icon.css'

defineOptions({ name: 'JvIcon' })
const { color, size, name } = defineProps(jvIconProps)

const bem = createNamespace('icon')
const iconRef = ref<HTMLElement | null>(null)

const iconClass = computed(() => {
  const baseClass = bem.b()
  const sizeClass = isString(size) && (size as string).toUpperCase() in SizeOptions
    ? bem.m(size as string)
    : ''
  return [baseClass, sizeClass].filter(Boolean)
})
const iconStyle = computed(() => {
  const result = {} as Record<string, string>

  if (color) {
    result.color = color
  }

  if (size || isNumberExcludeNaN(size)) {
    result.fontSize = `${size}px`
    result.lineHeight = `${size}px`
    result.width = `${size}px`
    result.height = `${size}px`
    result.maxHeight = `${size}px`
    result.maxWidth = `${size}px`
  }
  return result
})

const show = computed(() => name && !String(name).startsWith('$'))

const internalIconRender = computed(() => {
  if (name && String(name).startsWith('$')) {
    const iconName = name as keyof typeof internalIcons
    return internalIcons[iconName]
  }
  return null
})

// 优化 setPathFill 函数
function setPathFill(fill: string) {
  if (!iconRef.value)
    return

  const svg = iconRef.value.querySelector('svg')
  if (!svg)
    return

  // 使用一次性查询所有 SVG 图形元素
  const elements = svg.querySelectorAll<SVGElement>('path, circle, rect, polygon, ellipse')
  // 使用 requestAnimationFrame 优化性能
  requestAnimationFrame(() => {
    elements.forEach((element) => {
      if (!element.hasAttribute('stroke')) {
        element.setAttribute('fill', fill)
        element.setAttribute('width', '1em')
        element.setAttribute('height', '1em')
      }
    })
  })
}

// 优化 watch，添加防抖
const debouncedSetFill = useDebounceFn((fill: string) => {
  if (fill) {
    nextTick(() => {
      setPathFill(fill)
    })
  }
}, 16) // 约一帧的时间

watch(() => [name], ([newName]) => {
  if (newName) {
    debouncedSetFill(newName)
  }
}, { immediate: true })

// 暴露方法和引用
defineExpose({
  setPathFill,
  iconRef,
})
</script>

<template>
  <i
    ref="iconRef"
    :class="iconClass"
    :style="iconStyle"
  >
    <slot v-if="$slots.default" />
    <Icon
      v-else-if="show && name"
      :icon="name"
      :color="color"
    />
    <component :is="internalIconRender" v-else-if="internalIconRender" />
  </i>
</template>

<style lang="css" scoped>
.jv-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.jv-icon svg {
  width: 100%;
  height: 100%;
}

.jv-icon svg path,
.jv-icon svg circle,
.jv-icon svg rect,
.jv-icon svg polygon,
.jv-icon svg ellipse {
  transition: fill 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
