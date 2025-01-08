<script setup lang="ts">
import type {
  ButtonEmits,
  ButtonExposed,
  ButtonProps,
  ButtonSlots,
} from './button'
import { Loading } from '@components/internal-icon/index'
import JvIcon from '@components/JvIcon/src/icon.vue'
import { createNamespace } from '@jovial/utils'
import { computed } from 'vue'
import './button.css'

defineOptions({
  name: 'JvButton',
  inheritAttrs: true,
})
// 使用 withDefaults 为 props 设置默认值
const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  width: '100%',
  size: 'medium',
  disabled: false,
  loading: false,
  rounded: false,
  dashed: false,
  block: false,
  stacked: false,
  color: '',
  bgColor: '',
  variant: 'elevated',
  nativeType: 'button',
  autofocus: false,
})
const emit = defineEmits<ButtonEmits>()
defineSlots<ButtonSlots>()
const bem = createNamespace('button')

const rootRef = ref<HTMLButtonElement | null>(null)

function emitClick(e: MouseEvent) {
  emit('click', e)
}

function emitMouseDown(e: MouseEvent) {
  emit('mousedown', e)
}

const buttonStyle = computed(() => {
  const result = {} as Record<string, string>
  if (props.color) {
    result.color = props.color
  }
  if (props.bgColor) {
    result['background-color'] = props.bgColor
  }
  return result
})

const _loading = ref(props.loading)
const _disabled = ref(props.disabled)

watchEffect(() => {
  _loading.value = props.loading
  _disabled.value = props.disabled
})

const exposed: ButtonExposed = {
  root: rootRef.value,
  setLoading: (loading: boolean) => {
    _loading.value = loading
  },
  setDisabled: (disabled: boolean) => {
    _disabled.value = disabled
  },
}

defineExpose<ButtonExposed>(exposed)
</script>

<template>
  <button
    ref="rootRef"
    :class="[
      bem.b(),
      bem.m(type),
      bem.m(size),
      bem.m(variant),
      bem.is('dashed', dashed),
      bem.is('rounded', rounded),
      bem.is('loading', _loading),
      bem.is('disabled', _disabled),
      bem.is('block', block),
      bem.is('stacked', stacked),
    ]"
    :disabled="loading || disabled"
    :style="buttonStyle"
    :type="nativeType"
    :autofocus="autofocus"
    @click="emitClick"
    @mousedown="emitMouseDown"
  >
    <span v-if="$slots.prepend" :class="bem.e('prepend')">
      <slot name="prepend" />
    </span>

    <span v-if="loading" :class="bem.e('loader')">
      <JvIcon :size="size">
        <Loading />
      </JvIcon>
    </span>

    <span :class="bem.e('content')">
      <!-- 默认插槽 -->
      <slot />
    </span>
    <span v-if="$slots.append" :class="bem.e('append')">
      <slot name="append" />
    </span>
  </button>
</template>
