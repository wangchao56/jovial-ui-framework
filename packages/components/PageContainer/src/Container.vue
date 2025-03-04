<script setup lang="ts">
import { createNamespace } from '@jienix/utils'
import { computed, useSlots } from 'vue'
import { containerContextKey, type ContainerProps } from './types'
import '../style/jv-container.css'

defineOptions({ name: 'JvContainer' })

const props = withDefaults(defineProps<ContainerProps>(), {
  direction: 'horizontal',
  border: false,
  headerHeight: '60px',
  asideWidth: '240px',
  footerHeight: '60px',
})
const slots = useSlots()
const bem = createNamespace('container')

// 判断是否包含特定子组件
const isVertical = computed(() => {
  if (props.direction === 'vertical')
    return true
  if (props.direction === 'horizontal')
    return false
  return slots.default?.().some((vnode: any) => {
    const tag = vnode.type?.name
    return tag === 'JvHeader' || tag === 'JvFooter'
  })
})

const heights = reactive({
  headerHeight: props.headerHeight,
  asideWidth: props.asideWidth,
  footerHeight: props.footerHeight,
})

provide(containerContextKey, {
  isVertical: isVertical.value,
  direction: props.direction,
  border: props.border,
  headerHeight: heights.headerHeight,
  asideWidth: heights.asideWidth,
  footerHeight: heights.footerHeight,
})

useCssVars((_) => {
  return {
    'jv-header-height': heights.headerHeight,
    'jv-aside-width': heights.asideWidth,
    'jv-footer-height': heights.footerHeight,
  }
})
</script>

<template>
  <section :class="[bem.b(), { 'is-vertical': isVertical }]">
    <slot />
  </section>
</template>
