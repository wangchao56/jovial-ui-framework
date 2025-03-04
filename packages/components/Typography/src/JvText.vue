<script setup lang="ts">
import type { TextProps } from './types'
import { createNamespace } from '@jienix/utils'
import { useTypography } from './composables'

defineOptions({
  name: 'JvText',
})

const props = withDefaults(defineProps<TextProps>(), {
  writingMode: 'horizontal',
  variant: 'text',
  type: 'default',
  align: 'start',
})
const bem = createNamespace('text')
const { styleComputed, classComputed } = useTypography(props)
const Tag = props.variant === 'text' ? 'span' : props.variant
</script>

<template>
  <span
    :class="[
      bem.b(),
      bem.m(props.type),
      {
        [bem.m(props.variant)]: props.variant !== 'text',
      },
    ]"
    role="text"
  >
    <Tag
      v-if="variant !== 'text'"
      :class="[
        classComputed,
      ]"
      :style="styleComputed"
    >
      <slot />
    </Tag>
    <slot v-else />
  </span>
</template>
