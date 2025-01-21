<script setup lang="ts">
import type { IconProps } from './icon'
import { AlertOutline, AlienOutline, CheckOutline, IconCloseThick, IconEyeOff, IconEyeOn, InfoOutline, Loading } from '@components/internal-icon'
import { Icon } from '@iconify/vue'
import { SizeOptions } from '@jovial/typings'
import { createNamespace, isNumberExcludeNaN, isString } from '@jovial/utils'
import { computed, h } from 'vue'

import './icon.css'

defineOptions({ name: 'JvIcon' })
const props = defineProps<IconProps>()
const bem = createNamespace('icon')

const iconClass = computed(() => {
  const baseClass = bem.b()
  const sizeClass
    = isString(props.size) && (props.size as string).toUpperCase() in SizeOptions
      ? bem.m(props.size as string) // 假设 SizeOptions 枚举为小写字符串
      : ''
  return [baseClass, sizeClass].filter(Boolean) // 过滤掉 falsy 值
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
    result.maxHeight = `${props.size}px`
  }
  return result
})

// 内置图标和插槽内容互斥，二者只能存在其一
const show = computed(() => props.name && !String(props.name).startsWith('$'))

const internalIcons = {
  $close: h(IconCloseThick),
  $eyeOn: h(IconEyeOn),
  $eyeOff: h(IconEyeOff),
  $loading: h(Loading),
  $success: h(CheckOutline),
  $error: h(AlienOutline),
  $info: InfoOutline,
  $warning: AlertOutline,
}

const internalIconRender = computed(() => {
  if (props.name && String(props.name).startsWith('$')) {
    const iconName = props.name as keyof typeof internalIcons
    return internalIcons[iconName]
  }
  return null
})
</script>

<template>
  <i :class="iconClass" :style="iconStyle">
    <slot v-if="$slots.default" />
    <Icon v-else-if="show && name" :icon="name" :color="color" />
    <internalIconRender v-else />
    <!-- <JvRenderVNodeContent v-else :vnode="internalIconRender" /> -->
  </i>
</template>
