<template>
  <i :class="iconClass" :style="iconStyle">
    <slot></slot>
  </i>
</template>

<script setup lang="ts">
import { isNumberExcludeNaN, isString, createNamespace } from '@jovial/utils'
import { computed } from 'vue'
import { iconProps } from './icon'
import { SizeOptions } from '@jovial/typings'
import type { IconProps } from './icon'

defineOptions({ name: 'JvIcon' })
const props = defineProps<IconProps>()
const bem = createNamespace('icon')

const iconClass = computed(() => {
  const baseClass = bem.b()
  const sizeClass =
    isString(props.size) && (props.size as string).toUpperCase() in SizeOptions
      ? bem.m(props.size as string) // 假设 SizeOptions 枚举为小写字符串
      : ''
  return [baseClass, sizeClass].filter(Boolean) // 过滤掉 falsy 值
})

const iconStyle = computed(() => {
  let result = {} as Record<string, string>

  if (props.color) {
    result.color = props.color
  }

  if (props.size || isNumberExcludeNaN(props.size)) {
    result.fontSize = `${props.size}px`
    result.lineHeight = `${props.size}px`
    result.width = `${props.size}px`
    result.maxHeight = `${props.size}px`
  }

  return result
})
</script>
