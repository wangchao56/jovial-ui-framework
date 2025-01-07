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
        <slot name="content"></slot>
      </div>
      <!-- <div v-else-if="$slots.activator">
        <slot name="activator"></slot>
      </div> -->
      <div v-else>
        <slot></slot>
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
<script setup lang="ts">
import { ref } from 'vue'
import { createNamespace } from '@jovial/utils'
import { tooltipEmits, tooltipProps } from './tooltip'
import type { TooltipProps, TooltipSlots } from './tooltip'
import JvPopperVue from '../../popper/src/popper.vue'
import { ReferenceType } from '../../popper'
import JvRenderVNodeContent from '../../internal/render-vnode-content.setup'
// 使用 UUID 生成唯一标识符
import { v4 as uuidv4 } from 'uuid'

defineOptions({ name: 'JvTooltip' })
const props = withDefaults(defineProps<TooltipProps>(), {
  trigger: 'hover',
  content: '',
  placement: 'bottom-end'
})
const emit = defineEmits(tooltipEmits)
const bem = createNamespace('tooltip')
defineSlots<TooltipSlots>()

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
    console.log('hover')
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
