<script setup lang="tsx">
import { createNamespace } from '@jienix/utils'
import { provide, ref } from 'vue'
import { jvButtonGroupProps } from './JvButtonGroup'

defineOptions({ name: 'JvButtonGroup', inheritAttrs: false })

const { size, rounded, vertical, gap, justify } = defineProps(jvButtonGroupProps)

const bem = createNamespace('button-group')
const rootRef = ref<HTMLElement | null>(null)

provide('buttonGroupContext', {
  size,
  rounded,
})

const groupStyle = {
  gap: typeof gap === 'number' ? `${gap}px` : gap,
  justifyContent: justify,
}
</script>

<template>
  <div ref="rootRef" :class="[bem.b(), bem.is('vertical', vertical), bem.is('rounded', rounded)]" :style="groupStyle">
    <slot />
  </div>
</template>
