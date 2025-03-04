<script setup lang="tsx">
import { createNamespace } from '@jienix/utils'
import { provide, ref } from 'vue'
import { jvButtonGroupProps } from './JvButtonGroup'
import '../style/jv-button-group.css'

defineOptions({ name: 'JvButtonGroup' })

const props = defineProps(jvButtonGroupProps)

const bem = createNamespace('button-group')
const rootRef = ref<HTMLElement | null>(null)

provide('buttonGroupContext', {
  size: props.size,
  rounded: props.rounded,
})

const groupStyle = {
  gap: typeof props.gap === 'number' ? `${props.gap}px` : props.gap,
  justifyContent: props.justify,
}
</script>

<template>
  <div
    ref="rootRef"
    :class="[bem.b(), bem.is('vertical', vertical), bem.is('rounded', rounded)]"
    :style="groupStyle"
  >
    <slot />
  </div>
</template>
