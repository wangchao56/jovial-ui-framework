<script setup lang="ts">
import { createNamespace } from '@jienix/utils'
import { headerProps } from './types'

defineOptions({ name: 'JvHeader', inheritAttrs: false })

const props = defineProps(headerProps)
const bem = createNamespace('header')
</script>

<template>
  <header :class="bem.b()" :style="{ height: props.height }">
    <slot />
  </header>
</template>
