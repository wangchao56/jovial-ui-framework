<script setup lang="ts">
import { createNamespace } from '@jienix/utils'
import { footerProps } from './types'

defineOptions({ name: 'JvFooter' })

const props = defineProps(footerProps)
const bem = createNamespace('footer')
</script>

<template>
  <footer :class="bem.b()" :style="{ height: props.height }">
    <slot />
  </footer>
</template>
