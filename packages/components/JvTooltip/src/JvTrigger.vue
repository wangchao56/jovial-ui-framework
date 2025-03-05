<script setup lang="ts">
import type { JvTooltipTriggerProps } from './trigger'
import JvText from '@components/Typography/src/JvText.vue'
import { isString } from '@jienix/utils'
import isElement from 'lodash-es/isElement'
import { isVNode, type VNode, type VNodeChild } from 'vue'
import JvFragmentWrapper from './fragment-wrapper'
import { setupTriggerEventsAndApplyEffect } from './useTootipManager'

defineOptions({
  name: 'JvTooltipTrigger',
})
const props = defineProps<JvTooltipTriggerProps>()
const { firstChild, isTriggerTextNode, activator, parentDom, bem, referenceRef, trigger } = toRefs(props)

const { attachEvents, applyEffect, detachEvents } = setupTriggerEventsAndApplyEffect({
  bemClass: bem.value.e('trigger'),
  attributes: {
    'data-tooltip-trigger': props.tootipId || '',
  },
  trigger: unref(trigger),
  onOpen: props.onOpen,
  onClose: props.onClose,
  onToggle: props.onToggle,
})
function setRef(el: HTMLElement | null) {
  applyEffect(el as HTMLElement)
  attachEvents(el as HTMLElement)
  props.setReference(el as HTMLElement)
}
const showWrapper = computed(() => {
  if (isString(activator.value))
    return false
  return true
})
onMounted(() => {
  if (isElement(activator.value)) {
    setRef(activator.value as HTMLElement)
  }
  // 传入的activator为字符串时，返回false
  if (isString(activator.value)) {
    if (activator.value === 'parent') {
      setRef(parentDom.value as HTMLElement)
    }
    else {
      const activatorDom = document.querySelector(activator.value as string)
      setRef(activatorDom as HTMLElement)
    }
  }
})
// 传入的activator为Vnode时，返回Vnode 否则返回第一个子节点
const activatorNode = computed<VNode | VNodeChild>(() => {
  // 虚拟节点
  if (isVNode(activator.value)) {
    return activator.value
  }
  return firstChild.value
})

onBeforeUnmount(() => {
  if (referenceRef.value) {
    detachEvents(referenceRef.value as HTMLElement)
  }
})
</script>

<template>
  <JvFragmentWrapper v-if="showWrapper" :set-ref="setRef" only-child>
    <template #default>
      <JvText v-if="isTriggerTextNode && firstChild">
        <component :is="activatorNode" />
      </JvText>
      <component :is="activatorNode" v-else />
    </template>
  </JvFragmentWrapper>
</template>

<style>
.jv-tooltip__trigger {
  cursor: pointer;
}
</style>
