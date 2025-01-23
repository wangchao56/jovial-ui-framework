<script setup lang="ts">
import type { IconProps } from './icon'
import { internalIcons } from '@components/internal-icon'
import { Icon } from '@iconify/vue'
import { SizeOptions } from '@jovial/typings'
import { createNamespace, isNumberExcludeNaN, isString } from '@jovial/utils'
import { useDebounceFn } from '@vueuse/core'
import { computed, nextTick, ref, watch } from 'vue'
import './icon.css'

defineOptions({ name: 'JvIcon' })
const props = withDefaults(defineProps<IconProps>(), {
  fill: 'currentColor',
})

const bem = createNamespace('icon')
const iconRef = ref<HTMLElement | null>(null)

const iconClass = computed(() => {
  const baseClass = bem.b()
  const sizeClass = isString(props.size) && (props.size as string).toUpperCase() in SizeOptions
    ? bem.m(props.size as string)
    : ''
  return [baseClass, sizeClass].filter(Boolean)
})
const iconStyle = computed(() => {
  const result = {} as Record<string, string>

  if (props.color) {
    result.color = props.color
  }

  if (props.size || isNumberExcludeNaN(props.size)) {
    result.fontSize = `${props.size}px`
    result.lineHeight = `${props.size}px`
    result.width = `${props.size}px`
    result.height = `${props.size}px`
    result.maxHeight = `${props.size}px`
    result.maxWidth = `${props.size}px`
  }
  return result
})

const show = computed(() => props.name && !String(props.name).startsWith('$'))

const internalIconRender = computed(() => {
  if (props.name && String(props.name).startsWith('$')) {
    const iconName = props.name as keyof typeof internalIcons
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

watch(() => [props.fill, props.name], ([newFill, _]) => {
  if (newFill) {
    debouncedSetFill(newFill)
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
    <internalIconRender v-else />
  </i>
</template>

<style>
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
