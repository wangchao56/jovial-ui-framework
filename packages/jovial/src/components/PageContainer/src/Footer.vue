<script setup lang="ts">
import { createNamespace } from '@jovial/utils'
import { footerProps } from './types'
import '../style/jv-footer.css'

defineOptions({ name: 'JvFooter' })

const props = defineProps(footerProps)
const bem = createNamespace('footer')
</script>

<template>
  <footer :class="bem.b()" :style="{ height: props.height }">
    <slot />
  </footer>
</template>
