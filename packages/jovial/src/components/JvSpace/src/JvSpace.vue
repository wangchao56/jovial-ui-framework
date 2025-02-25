<script setup lang="ts">
import { createNamespace, isArray, isNumber, isString } from '@jovial/utils'
import { jvSpaceProps } from './JvSpace'
import '../style/jv-space.css'

defineOptions({ name: 'JvSpace' })
const props = defineProps(jvSpaceProps)
const bem = createNamespace('space')

const cssVars: Record<string, string> = {
  'jv-space-size': '16px',
  'jv-space-vertical-size': '16px',
}
function craeteCssVars(x: number, y: number) {
  if (x) {
    cssVars['jv-space-size'] = `${x}px`
  }
  if (y) {
    cssVars['jv-space-vertical-size'] = `${y}px`
  }
  return cssVars
}

useCssVars((_ctx) => {
  const sizes = props.size
  if (!sizes) {
    return cssVars
  }
  if (isNumber(sizes)) {
    return craeteCssVars(sizes as number, sizes as number)
  }
  else if (sizes && isArray(sizes) && Array.isArray(sizes) && sizes.length === 2) {
    return craeteCssVars(sizes[0], sizes[1])
  }
  else if (isString(sizes)) {
    switch (sizes as string) {
      case 'small':
        return craeteCssVars(8, 8)
      case 'large':
        return craeteCssVars(24, 24)
      case 'medium':
      default:
        return craeteCssVars(16, 16)
    }
  }
  return cssVars
})
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.m(`align-${align}`),
      bem.m(`justify-${justify}`),
      bem.m(direction ?? 'horizontal'),
      bem.is('wrap', wrap),
      bem.is('inline', inline),
      // 自定义类
    ]"
  >
    <slot />
  </div>
</template>
