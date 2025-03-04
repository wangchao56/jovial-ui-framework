<script setup lang="ts">
import type { LinkProps } from './types'
import { createNamespace } from '@jienix/utils'
import { RouterLink } from 'vue-router'
import { useTypography } from './composables'

defineOptions({
  name: 'JvLink',
})

const props = withDefaults(defineProps<LinkProps>(), {
  writingMode: 'horizontal',
  variant: 'text',
  disabled: false,
  disabledColor: false,
})

const bem = createNamespace('link')
const { styleComputed, classComputed } = useTypography(props)

// 路由链接判断逻辑
const isExternalLink = computed(() =>
  typeof props.to === 'string' && props.to.startsWith('http'),
)
</script>

<template>
  <component
    :is="isExternalLink ? 'a' : RouterLink"
    :class="[
      bem.b(),
      {
        [bem.m('disabled')]: props.disabled,
        [bem.m('custom-color')]: props.disabledColor,
      },
      classComputed,
    ]"
    :style="styleComputed"
    :to="!isExternalLink ? to : undefined"
    :href="isExternalLink ? to : undefined"
    role="link"
  >
    <slot />
  </component>
</template>
