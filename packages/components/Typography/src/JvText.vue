<script setup lang="ts">
import type { TextProps } from './types'
import { createNamespace } from '@jienix/utils'
import { useTypography } from './composables'

defineOptions({
  name: 'JvText',
  inheritAttrs: true,
})

const props = withDefaults(defineProps<TextProps>(), {
  writingMode: 'horizontal',
  variant: 'text',
  type: 'default',
  align: 'start',
  text: '',
})
const bem = createNamespace('text')
const { styleComputed, classComputed } = useTypography(props)
const Tag = props.variant === 'text' ? 'span' : props.variant
</script>

<template>
  <span
    :class="[
      bem.b(),
      bem.m(type),
      {
        [bem.m(variant)]: variant !== 'text',
      },
    ]" :role="variant === 'text' ? 'text' : undefined"
  >
    <Tag
      v-if="variant !== 'text'" :class="[
        classComputed,
      ]" :style="styleComputed"
    >
      <slot>
        {{ text }}
      </slot>
    </Tag>
    <slot v-else>
      {{ text }}
    </slot>
  </span>
</template>
