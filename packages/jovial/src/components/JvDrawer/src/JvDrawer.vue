<script setup lang="ts">
import type { JvDrawerEmits, JvDrawerProps } from './JvDrawer'
import JvOverlay from '@components/JvOverlay/src/JvOverlay.vue'
import { createNamespace } from '@jovial/utils'
import { type CSSProperties, ref } from 'vue'

import '../style/style.css'

defineOptions({ name: 'JvDrawer' })
const props = withDefaults(defineProps<JvDrawerProps>(), {
  position: 'right',
  width: '30%',
  height: '100vh',
  closeOnClickOverlay: true,
})
const emit = defineEmits<JvDrawerEmits>()
const bem = createNamespace('drawer')
const dr = createNamespace('drawer-overlay')

const drawerRef = ref<HTMLDivElement | null>(null)
const visibleOverlay = useModel(props, 'modelValue')
const visibleDrawer = ref(false)

function closeDrawer() {
  visibleDrawer.value = false
}

function openDrawer() {
  visibleDrawer.value = true
}

function clickClose() {
  visibleOverlay.value = false
}

function afterEnter() {
  emit('opened')
}
function afterLeave() {
  emit('closed')
  closeDrawer()
}
function beforeLeave() {
  emit('close')
}
const compId = `jv-drawer-${useId()}`
const cssVars = computed<CSSProperties>(() => ({
  '--jv-drawer-width': props.width,
  '--jv-drawer-height': props.height,
}))
</script>

<template>
  <Teleport to="body" :disabled="!visibleOverlay">
    <JvOverlay
      v-model="visibleOverlay"
      :overlay-class="dr.b()"
      :close-on-click-overlay="closeOnClickOverlay"
      @opened="openDrawer"
      @closed="closeDrawer"
    >
      <Transition
        name="drawer-slide"
        @after-enter="afterEnter"
        @after-leave="afterLeave"
        @before-leave="beforeLeave"
      >
        <section
          v-show="visibleDrawer"
          :id="compId"
          ref="drawerRef"
          :style="cssVars"
          :data-position="position"
          :aria-labelledby="compId"
          role="dialog"
          :class="[bem.b(), bem.m(position), bem.is('visible', visibleDrawer), bem.is('closable', closable)]"
          @click.stop
        >
          <header v-if="$slots.header" :class="[bem.e('header')]">
            <slot name="header" />
          </header>
          <main v-if="$slots.default" :class="[bem.e('body')]">
            <slot />
          </main>
          <footer v-if="$slots.footer" :class="[bem.e('footer')]">
            <slot name="footer" />
          </footer>
          <JvButton v-if="closable" size="small" :class="[bem.e('close')]" variant="text" icon="$close" @click="clickClose" />
        </section>
      </Transition>
    </JvOverlay>
  </Teleport>
</template>

<style  scoped>
.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.3s;
  transition-property: transform;
  /* transition-delay: -0.2s; */
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(10%);
}
.drawer-slide-enter-from[data-position='left'],
.drawer-slide-leave-to[data-position='left'] {
  transform: translateX(-100%);
}
.drawer-slide-enter-from[data-position='top'],
.drawer-slide-leave-to[data-position='top'] {
  transform: translateY(-100%);
}
.drawer-slide-enter-from[data-position='bottom'],
.drawer-slide-leave-to[data-position='bottom'] {
  transform: translateY(10%);
}
</style>
