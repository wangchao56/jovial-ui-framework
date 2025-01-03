<template>
  <button
    :class="[
      bem.b(),
      bem.m(type),
      bem.m(size),
      bem.m(variant),
      bem.is('dashed', dashed),
      bem.is('rounded', rounded),
      bem.is('loading', loading),
      bem.is('disabled', disabled),
      bem.is('block', block),
      bem.is('stacked', stacked)
    ]"
    :disabled="loading || disabled"
    :style="buttonStyle"
    :type="nativeType"
    :autofocus="autofocus"
    @click="emitClick"
    @mousedown="emitMouseDown"
  >
    <span v-if="$slots.prepend" :class="bem.e('prepend')">
      <slot name="prepend"></slot>
    </span>

    <span v-if="loading" :class="bem.e('loader')">
      <JvIcon :size="size">
        <Loading />
      </JvIcon>
    </span>

    <span :class="bem.e('content')">
      <!-- 默认插槽 -->
      <slot></slot>
    </span>
    <span v-if="$slots.append" :class="bem.e('append')">
      <slot name="append"></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '@jovial/utils'
import { ButtonEmits, buttonProps } from './button'
import { ButtonSlots } from './button'
import Loading from '@jovial/components/internal-icon/Loading'
import JvIcon from '@jovial/components/icon'
defineOptions({
  name: 'JvButton',
  inheritAttrs: true
})
const props = defineProps(buttonProps)
defineSlots<ButtonSlots>()
const emit = defineEmits<ButtonEmits>()
const bem = createNamespace('button')

function emitClick(e: MouseEvent) {
  emit('click', e)
}

function emitMouseDown(e: MouseEvent) {
  emit('mousedown', e)
}

const buttonStyle = computed(() => {
  let result = {} as Record<string, string>
  if (props.color) {
    result['color'] = props.color
  }
  if (props.bgColor) {
    result['background-color'] = props.bgColor
  }
  return result
})
</script>
