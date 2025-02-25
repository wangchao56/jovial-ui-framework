<script setup lang="ts">
import type { JvLoadingProps } from './JvLoading'
import { createNamespace } from '@jovial/utils'
import { computed, ref } from 'vue'
import { jvLoadingEmits } from './JvLoading'
import '../style/style.css'

defineOptions({ name: 'JvLoading' })

const props = withDefaults(defineProps<JvLoadingProps>(), {
  size: 40,
  color: '#333',
  count: 8,
  speed: 1.2,
})

const emit = defineEmits(jvLoadingEmits)
const bem = createNamespace('loading')

const loading = ref(true)

const dots = computed(() => {
  const result = []
  const radius = 42 // 圆的半径(相对于viewBox 100x100)
  const center = 50 // viewBox中心点

  for (let i = 0; i < props.count; i++) {
    const angle = (i * 360) / props.count
    const radian = (angle * Math.PI) / 180
    const x = center + radius * Math.cos(radian)
    const y = center + radius * Math.sin(radian)
    result.push({ x, y, delay: (i * props.speed) / props.count })
  }

  return result
})

// const containerStyle = computed(() => ({
//   '--jv-loading-size': `${props.size}px`,
//   '--jv-loading-color': props.color,
//   '--jv-loading-speed': `${props.speed}s`,
//   '--jv-loading-dot-size': '20%',
// }))

function stopLoading() {
  loading.value = false
  emit('stop')
}
</script>

<template>
  <div
    :class="bem.b()"
    :style="{
      '--jv-loading-size': `${props.size}px`,
      '--jv-loading-color': props.color,
      '--jv-loading-speed': `${props.speed}s`,
    }"
  >
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        v-for="(dot, index) in dots"
        :key="index"
        :cx="dot.x"
        :cy="dot.y"
        r="8"
        :style="{
          animationDelay: `${dot.delay}s`,
        }"
      />
    </svg>
    <slot>Loading...</slot>
    <button v-if="showStopButton" :class="bem.e('stop-btn')" @click="stopLoading">
      Stop
    </button>
  </div>
</template>

<style lang="css" scoped>
.jv-loading {
  --jv-loading-size: 40px;
  --jv-loading-color: #333;
  --jv-loading-speed: 1.2s;

  display: inline-block;
  width: var(--jv-loading-size);
  height: var(--jv-loading-size);
}

.jv-loading svg {
  width: 100%;
  height: 100%;
  animation: rotate calc(var(--jv-loading-speed) * 2) linear infinite;
}

.jv-loading circle {
  fill: var(--jv-loading-color);
  animation: oscillate var(--jv-loading-speed) ease-in-out infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes oscillate {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.3;
    transform: scale(0.85);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
