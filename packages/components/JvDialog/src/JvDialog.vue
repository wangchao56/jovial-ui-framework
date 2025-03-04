<script setup lang="ts">
import type { JvDialogEmits, JvDialogSlots } from './JvDialog'
import JvButton from '@/components/JvButton/src/JvButton.vue'
import JvRenderVNodeContent from '@components/internal/render-vnode-content.setup'
import JvSpace from '@components/JvSpace'
import { createNamespace } from '@jienix/utils'
import { useEventListener } from '@vueuse/core'
import { jvDialogProps } from './JvDialog'
import '../style/jv-dialog.css'

defineOptions({ name: 'JvDialog' })
const props = defineProps(jvDialogProps)
const emit = defineEmits<JvDialogEmits>()
const slots = defineSlots<JvDialogSlots>()

const bem = createNamespace('dialog')

const dialogRef = ref<HTMLDialogElement | null>(null)
const visible = useModel(props, 'modelValue')

const renderContent = computed(() => {
  if (slots.default) {
    return slots.default
  }
  else if (props.content) {
    return props.content
  }
  else {
    return null
  }
})

function close() {
  emit('update:modelValue', false)
}

function cancel() {
  emit('cancel')
  close()
}

function confirm() {
  emit('confirm')
  close()
}

useEventListener(dialogRef, 'click', (e) => {
  e.stopPropagation()
  if (dialogRef.value && props.closeOnClickOverlay) {
    const { x, y } = dialogRef.value.getBoundingClientRect()
    if (e.clientX < x || e.clientY < y || e.clientX > x + dialogRef.value.offsetWidth || e.clientY > y + dialogRef.value.offsetHeight) {
      close()
    }
  }
})

watch(visible, (val) => {
  if (val) {
    if (typeof dialogRef.value?.showModal === 'function') {
      dialogRef.value?.showModal()
      dialogRef.value?.focus()
    }
  }
  else {
    dialogRef.value?.close()
  }
}, { flush: 'post' })

useCssVars(_ctx => ({
  'jv-dialog-width': `${props.width}px`,
}))

const dialogId = `jv-dialog-${useId()}`
</script>

<template>
  <dialog
    ref="dialogRef" :class="bem.b()" role="dialog"
    aria-modal="true"
    :aria-label="title"
    :aria-describedby="dialogId"
    tabindex="0"
  >
    <header :class="bem.e('header')">
      <slot name="header">
        {{ title }}
      </slot>
    </header>
    <div
      :id="dialogId"
      :class="bem.e('content')"
      tabindex="0"
      role="region"
      aria-live="polite"
      :aria-label="`${title} content`"
    >
      <JvRenderVNodeContent v-if="renderContent" :render="renderContent" />
    </div>
    <footer :class="bem.e('footer')">
      <slot name="footer" />
      <slot name="actions">
        <JvSpace size="large" direction="horizontal" :justify="actionPosition === 'left' ? 'start' : 'end'">
          <JvButton type="primary" @click="confirm">
            {{ confirmText }}
          </JvButton>
          <JvButton type="warning" @click="cancel">
            {{ cancelText }}
          </JvButton>
        </JvSpace>
      </slot>
    </footer>
  </dialog>
</template>
