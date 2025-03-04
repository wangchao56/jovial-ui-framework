<script setup lang="ts">
import type { TitleProps } from './types'
import { createNamespace } from '@jienix/utils'
import { useTypography } from './composables'

defineOptions({
  name: 'JvTitle',
})
const props = withDefaults(defineProps<TitleProps>(), {
  level: 1,
  writingMode: 'horizontal',
  fontSize: undefined,
  color: undefined,
  interactive: false,
  minContrast: 4.5,
  punctuationCompress: true,
  lineBreak: true,
})
const bem = createNamespace('title')
const { styleComputed, classComputed } = useTypography(props)
const Tag = `h${props.level}`
</script>

<template>
  <Tag
    :class="[
      bem.b(),
      bem.e('sr-only'),
      bem.e(`level-${level}`),
      classComputed,
    ]"
    :style="styleComputed"
    role="heading"
    :aria-level="level"
  >
    <slot />
  </Tag>
</template>
