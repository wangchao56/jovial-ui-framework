<script setup lang="ts">
import type { DialogEmits, DialogProps, DialogSlots } from './JvDialog'
import JvRenderVNodeContent from '@/components/internal/render-vnode-content.setup'
import JvButton from '@/components/JvButton'
import JvSpace from '@/components/JvSpace'
import { createNamespace } from '@jovial/utils'
import { useEventListener } from '@vueuse/core'

defineOptions({ name: 'JvDialog' })
const props = withDefaults(defineProps<DialogProps>(), {
  title: 'dialog title',
  width: 350,
  closeOnClickOverlay: false,
  confirmText: '确认',
  cancelText: '取消',
  actionPosition: 'right',
  confirmButtonProps: {},
  cancelButtonProps: {},

})
const emit = defineEmits<DialogEmits>()
const slots = defineSlots<DialogSlots>()

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
</script>

<template>
  <dialog ref="dialogRef" :class="bem.b()" role="dialog">
    <div :class="bem.e('header')">
      <slot name="header">
        {{ title }}
      </slot>
    </div>
    <div :class="bem.e('content')">
      <JvRenderVNodeContent v-if="renderContent" :render="renderContent" />
    </div>
    <div :class="bem.e('footer')">
      <slot name="footer" />
      <slot name="actions">
        <JvSpace size="large" direction="horizontal" :justify="actionPosition === 'left' ? 'start' : 'end'">
          <JvButton type="primary" @click="confirm">
            {{ confirmText }}
          </JvButton>
          <JvButton type="danger" @click="cancel">
            {{ cancelText }}
          </JvButton>
        </JvSpace>
      </slot>
    </div>
  </dialog>
</template>

<style src="./JvDialog.css"> </style>
