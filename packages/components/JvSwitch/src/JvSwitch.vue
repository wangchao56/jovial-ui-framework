<script setup lang="ts">
import type { JvSwitchEmits } from './JvSwitch'
import JvIcon from '@components/JvIcon'
import { useTheme } from '@jienix/jovial-theme'
import { createNamespace } from '@jienix/utils'
import { jvSwitchProps } from './JvSwitch'

defineOptions({ name: 'JvSwitch', inheritAttrs: false })

const { disabled, loading, size } = defineProps(jvSwitchProps)
const emit = defineEmits<JvSwitchEmits>()
const bem = createNamespace('switch')

const theme = useTheme()

const model = defineModel<boolean>('modelValue', { required: false, default: false })

function onChange(event: Event) {
  emit('change', (event.target as HTMLInputElement).checked)
}

function toggle() {
  if (disabled || loading)
    return
  model.value = !model.value
  emit('update:modelValue', !model.value)
}
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.m(size),
      { 'is-checked': model },
      bem.is('disabled', disabled),
      bem.is('loading', loading),
      theme.themeClasses.value,
    ]" role="switch" :aria-checked="model" @click="toggle"
  >
    <input
      :checked="model" type="checkbox" :class="bem.e('input')" :disabled="disabled || loading" hidden
      @change="onChange"
    >

    <span :class="bem.e('track')">
      <span :class="bem.e('thumb')">
        <JvIcon v-if="loading" name="$loading" :class="bem.e('loading-icon')" />
      </span>
    </span>
  </div>
</template>
