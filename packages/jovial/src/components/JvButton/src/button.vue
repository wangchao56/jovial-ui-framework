<script setup lang="ts">
import type {
  ButtonEmits,
  ButtonExposed,
  ButtonProps,
  ButtonSlots,
} from './button'
import { Loading } from '@components/internal-icon/index'
import JvIcon from '@components/JvIcon/src/JvIcon.vue'
import { createNamespace } from '@jovial/utils'
import { computed, inject } from 'vue'
import { JvButtonGroupContextKey } from './buttonGroup'
import '../style/button.css'

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

// 注入按钮组上下文
const buttonGroupContext = inject(JvButtonGroupContextKey, null)

// 合并 props
const finalProps = computed(() => ({
  ...props,
  // 如果在按钮组中，使用按钮组的 size 和 rounded
  size: buttonGroupContext?.size || props.size,
  rounded: buttonGroupContext?.rounded || props.rounded,
}))
</script>

<template>
  <button
    ref="rootRef"
    :class="[
      bem.b(),
      bem.m(finalProps.type),
      bem.m(finalProps.size),
      bem.m(variant),
      bem.is('dashed', dashed),
      bem.is('rounded', finalProps.rounded),
      bem.is('loading', _loading),
      bem.is('disabled', _disabled),
      bem.is('block', block),
      bem.is('stacked', stacked),
    ]"
    :disabled="loading || disabled"
    :style="buttonStyle"
    :type="nativeType"
    :autofocus="autofocus"
    @click.stop="emitClick($event)"
    @mousedown="emitMouseDown($event)"
  >
    <span v-if="$slots.prepend || prependIcon" :class="bem.e('prepend')">
      <!-- 自定义前置图标 -->
      <JvIcon v-if="prependIcon" :color="color" :size="size" :name="prependIcon" />
      <!-- 自定义前置内容 -->
      <slot v-else name="prepend" />
    </span>

    <span v-if="loading" :class="bem.e('loader')">
      <JvIcon :size="size" :color="color">
        <Loading />
      </JvIcon>
    </span>

    <span v-if="$slots.default || icon" :class="bem.e('content')">
      <!-- 图标插槽 -->
      <JvIcon v-if="icon" :size="size" :color="color" :name="icon" />
      <!-- 默认插槽 -->
      <slot v-else-if="$slots.default" />
    </span>
    <span v-if="$slots.append || appendIcon" :class="bem.e('append')">
      <JvIcon v-if="appendIcon" :size="size" :color="color" :name="appendIcon" />
      <slot v-else name="append" />
    </span>
  </button>
</template>
