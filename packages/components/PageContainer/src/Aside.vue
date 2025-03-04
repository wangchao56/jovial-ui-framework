<script setup lang="ts">
import { createNamespace } from '@jienix/utils'
import { asideProps, containerContextKey } from './types'
import '../style/jv-aside.css'

defineOptions({ name: 'JvAside' })
defineProps(asideProps)
const bem = createNamespace('aside')
const { isVertical } = inject(containerContextKey)!
</script>

<template>
  <aside :class="[bem.b(), bem.is('vertical', isVertical)]">
    <slot />
  </aside>
</template>
