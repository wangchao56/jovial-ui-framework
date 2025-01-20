<script setup lang="ts">
import type { JvAlertEmits, JvAlertExpose, JvAlertProps } from './JvAlert'
import JvButton from '@components/JvButton'
import JvIcon from '@components/JvIcon'
import { createNamespace } from '@jovial/utils'
import '../style/style.css'

defineOptions({ name: 'JvAlert' })
withDefaults(defineProps<JvAlertProps>(), {
  type: 'info',
  closable: false,
  closeText: '',
  showIcon: false,
})
const emit = defineEmits<JvAlertEmits>()
const bem = createNamespace('alert')
const visible = ref(true)

function close() {
  visible.value = false
}

function afterLeave() {
  emit('closed')
}

defineExpose<JvAlertExpose>({
  close,
  open() {
    visible.value = true
  },
})
</script>

<template>
  <Transition
    name="alert-fade"
    @after-leave="afterLeave"
  >
    <div v-show="visible" :class="[bem.b(), bem.m(type)]">
      <span v-if="showIcon" :class="bem.e('icon')">
        <slot name="icon">
          <JvIcon :name="`$${type}`" />
        </slot>
      </span>
      <hgroup :class="bem.e('content')">
        <slot name="title">
          <h4 :class="bem.em('content', 'title')">
            {{ title }}
          </h4>
        </slot>
        <slot name="description">
          <p :class="bem.em('content', 'description')">
            {{ description }}
          </p>
        </slot>
      </hgroup>
      <JvButton
        v-if="closable"
        variant="plain"
        size="small"
        :class="bem.e('close')"
        @click.stop="close"
      >
        <template v-if="closeText" #default>
          {{ closeText }}
        </template>
        <template v-else #default>
          <JvIcon name="$close" />
        </template>
      </JvButton>
    </div>
  </Transition>
</template>

<style scoped>
.alert-fade-enter-active,
.alert-fade-leave-active {
  transition: opacity 0.3s;
}

.alert-fade-enter-from,
.alert-fade-leave-to {
  opacity: 0;
}
</style>
