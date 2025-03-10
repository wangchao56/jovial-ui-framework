<script setup lang="ts">
import JvIcon from '@components/JvIcon'
import { JvText } from '@components/Typography'
import { useTheme } from '@jienix/jovial-theme'
import { createNamespace } from '@jienix/utils'
import { computed } from 'vue'
import { type JvAlertEmits, jvAlertProps, type JvAlertSlots } from './JvAlert'

defineOptions({
  name: 'JvAlert',
  inheritAttrs: false,
})
const { type, showIcon, icon, variant } = defineProps(jvAlertProps)
const emit = defineEmits<JvAlertEmits>()
defineSlots<JvAlertSlots>()
const bem = createNamespace('alert')
const theme = useTheme()
const visible = defineModel<boolean>('visible', {
  default: true,
})

const defaultIcon = computed(() => {
  switch (type) {
    case 'success':
      if (variant === 'outlined')
        return '$successOutline'
      return '$success'
    case 'warning':
      if (variant === 'outlined')
        return '$warningOutline'
      return '$warning'
    case 'error':
      if (variant === 'outlined')
        return '$errorOutline'
      return '$error'
    case 'info':
      if (variant === 'outlined')
        return '$infoOutline'
      return '$info'
    default:
      if (variant === 'outlined')
        return '$infoOutline'
      return '$info'
  }
})

// 如果没有提供图标，使用默认图标
const iconToShow = computed(() => {
  return icon || (showIcon ? defaultIcon.value : null)
})

function onClose(e: MouseEvent) {
  e.stopPropagation()
  emit('update:visible', false)
  // 内部控制
  visible.value = false
}

function onAfterLeave() {
  // 外部控制 关闭通知
  emit('close')
}
</script>

<template>
  <Transition name="jv-alert-fade" @after-leave="onAfterLeave">
    <div
      v-if="visible" :class="[
        bem.b(),
        bem.m(type),
        theme.themeClasses.value,
        {
          'jv-alert--outlined': variant === 'outlined',
          'jv-alert--filled': variant === 'filled',
          'jv-alert--border-left': variant === 'border-left',
          'jv-alert--dense': dense,
        },
      ]" role="alert" :aria-label="message"
    >
      <slot>
        <div v-if="iconToShow || $slots.icon" :class="bem.e('icon')">
          <slot name="icon">
            <JvIcon v-if="iconToShow" :name="defaultIcon" />
          </slot>
        </div>

        <div :class="bem.e('content')">
          <div v-if="title || $slots.title" :class="bem.e('title')" :aria-label="title">
            <slot name="title">
              {{ title }}
            </slot>
          </div>
          <div :class="bem.e('message')" :aria-label="message">
            <slot name="message">
              {{ message }}
            </slot>
          </div>
        </div>

        <div v-if="dismissible" :class="bem.e('close')" :aria-label="closeText" @click="onClose">
          <slot name="close">
            <JvText v-if="closeText">
              {{ closeText }}
            </JvText>
            <JvIcon v-else name="$close" />
          </slot>
        </div>
      </slot>
    </div>
  </Transition>
</template>

<!-- <style lang="css" scoped>
.jv-alert-fade-enter-active,
.jv-alert-fade-leave-active {
  transition: opacity 0.3s;
}

.jv-alert-fade-enter-from,
.jv-alert-fade-leave-to {
  opacity: 0;
}
</style> -->
