<script setup lang="ts">
import type {
  JvButtonEmits,
  JvButtonExposed,
  JvButtonSlots,
} from './JvButton'
import JvIcon from '@components/JvIcon'
import { useTheme } from '@jienix/jovial-theme'
import { createNamespace } from '@jienix/utils'
import { computed, inject } from 'vue'
import { jvButtonProps } from './JvButton'
import { JvButtonGroupContextKey } from './JvButtonGroup'

defineOptions({
  name: 'JvButton',
  inheritAttrs: true, // 是否继承原生属性 true 表示继承
})
// 使用 withDefaults 为 props 设置默认值
const { color, bgColor, ...props } = defineProps(jvButtonProps)
const emit = defineEmits<JvButtonEmits>()
defineSlots<JvButtonSlots>()
const bem = createNamespace('button')
const theme = useTheme()

const rootRef = ref<HTMLButtonElement | null>(null)

function emitClick(e: MouseEvent) {
  emit('click', e)
}

function emitMouseDown(e: MouseEvent) {
  emit('mousedown', e)
}

const buttonStyle = computed(() => {
  const result = {} as Record<string, string>
  // 在type没有设置时，使用color
  if (props.type === 'default') {
    if (color) {
      result.color = color
    }
    if (bgColor) {
      result['background-color'] = bgColor
    }
  }
  return result
})

const _loading = ref(props.loading)
const _disabled = ref(props.disabled)

watchEffect(() => {
  _loading.value = props.loading
  _disabled.value = props.disabled
})

// 注入按钮组上下文
const buttonGroupContext = inject(JvButtonGroupContextKey, null)

// 合并 props
const finalProps = computed(() => ({
  ...props,
  // 如果在按钮组中，使用按钮组的 size 和 rounded
  size: buttonGroupContext?.size || props.size,
  rounded: buttonGroupContext?.rounded || props.rounded,
}))

defineExpose<JvButtonExposed>({
  root: rootRef,
  setLoading: (loading: boolean) => {
    _loading.value = loading
  },
  setDisabled: (disabled: boolean) => {
    _disabled.value = disabled
  },
})
</script>

<template>
  <button
    ref="rootRef" v-bind="$attrs" role="button" :tabindex="(_disabled || _loading) ? -1 : 0"
    :disabled="_disabled || _loading" :aria-disabled="_disabled || _loading" :class="[
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
      { [bem.m('icon')]: icon },
      props.class,
      theme.themeClasses.value,
    ]" :style="buttonStyle" :type="nativeType" :autofocus="autofocus" @click="emitClick($event)"
    @mousedown="emitMouseDown($event)" @keydown.prevent="emit('keydown', $event)" @keyup.prevent="emit('keyup', $event)"
    @focus="emit('focus', $event)" @blur="emit('blur', $event)"
  >
    <span v-if="$slots.prepend || prependIcon" :class="bem.e('prepend')">
      <!-- 自定义前置图标 -->
      <JvIcon v-if="prependIcon" :color="color" :size="size" :name="prependIcon" :type="type" />
      <!-- 自定义前置内容 -->
      <slot v-else name="prepend" />
    </span>

    <span v-if="loading" :class="bem.e('loader')">
      <JvIcon :size="size" :color="color" name="$loading" />
    </span>

    <span v-if="$slots.default || icon" :class="bem.e('content')">
      <!-- 图标插槽 -->
      <JvIcon v-if="icon" :size="size" :color="color" :name="icon" :type="type" />
      <!-- 默认插槽 -->
      <slot v-else-if="$slots.default" />
    </span>
    <span v-if="$slots.append || appendIcon" :class="bem.e('append')">
      <JvIcon v-if="appendIcon" :size="size" :color="color" :name="appendIcon" :type="type" />
      <slot v-else name="append" />
    </span>
  </button>
</template>
