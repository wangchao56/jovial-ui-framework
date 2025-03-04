<script setup lang="ts">
import type { JvCollapseItemProps } from './JvCollapseItem'
import { createNamespace } from '@jienix/utils'
import { collapseContextKey } from './JvCollapse'
import { jvCollapseItemEmits } from './JvCollapseItem'

defineOptions({ name: 'JvCollapseItem' })
const props = withDefaults(defineProps<JvCollapseItemProps>(), {
  disabled: false,
})
defineEmits(jvCollapseItemEmits)
const bem = createNamespace('collapse-item')
const collapseContext = inject(collapseContextKey)
const isActive = computed(() => {
  return collapseContext?.activeNames.value.includes(props.name)
})
function handleActive() {
  if (props.disabled)
    return
  collapseContext?.handleItemClick(props.name)
}

const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el) {
    el.style.overflow = ''
    el.style.height = ''
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el) {
    el.style.height = '0px'
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
}
</script>

<template>
  <div :class="[bem.b(), bem.is('disabled', disabled)]">
    <div :class="[bem.e('header'), bem.is('disabled', disabled), bem.is('active', isActive)]" @click="handleActive">
      <slot name="title">
        {{ title }}
      </slot>
    </div>

    <Transition name="slide" v-on="transitionEvents">
      <div v-show="isActive" :class="bem.e('wrapper')">
        <div :class="bem.e('content')">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>
