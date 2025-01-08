<script setup lang="ts">
import type { ReferenceType } from '../../popper'
import type { TooltipProps, TooltipSlots } from './tooltip'
import { createNamespace } from '@jovial/utils'
// 使用 UUID 生成唯一标识符
import { ref } from 'vue'
import JvRenderVNodeContent from '../../internal/render-vnode-content.setup'
import JvPopperVue from '../../popper/src/popper.vue'
import { tooltipEmits } from './tooltip'

defineOptions({ name: 'JvTooltip' })
const props = withDefaults(defineProps<TooltipProps>(), {
  trigger: 'hover',
  content: '',
  placement: 'bottom-end',
})
defineEmits(tooltipEmits)
defineSlots<TooltipSlots>()
const bem = createNamespace('tooltip')
const popperRef = ref<InstanceType<typeof JvPopperVue>>()
const referenceRef = ref<ReferenceType>()
const visibleRef = ref(false)
// TODO: 完善插槽逻辑

// TODO: 完善逻辑
// 1. 触发方式

function handleClickShow() {
  if (props.trigger === 'click') {
    visibleRef.value = !visibleRef.value
  }
  popperRef.value?.update()
}

function handleHoverShow() {
  if (props.trigger === 'hover') {
    visibleRef.value = true
  }
  popperRef.value?.update()
}

function handleHide() {
  if (props.trigger === 'hover') {
    visibleRef.value = false
  }
  popperRef.value?.update()
}
</script>

<template>
  <div :class="bem.b()">
    <div
      ref="referenceRef"
      :class="bem.e('reference')"
      @click="handleClickShow"
      @mouseenter.prevent="handleHoverShow"
      @mouseleave="handleHide"
    >
      <div v-if="$slots.content">
        <slot name="content" />
      </div>
      <!-- <div v-else-if="$slots.activator">
        <slot name="activator"></slot>
      </div> -->
      <div v-else>
        <slot />
      </div>
    </div>
    <JvPopperVue
      ref="popperRef"
      :offset="12"
      :visible="visibleRef"
      :reference="referenceRef"
      :placement="placement || 'bottom-end'"
    >
      <template #content>
        <div v-if="content">
          {{ content }}
        </div>
        <JvRenderVNodeContent
          v-else-if="$slots.content"
          :render="$slots.content"
        />
        <JvRenderVNodeContent v-else :render="$slots.default" />
      </template>
    </JvPopperVue>
  </div>
</template>
