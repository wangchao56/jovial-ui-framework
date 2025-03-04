<script setup lang="ts">
import type { JvVideoEmits } from './JvVideo'
import { createNamespace } from '@jienix/utils'
import { ref } from 'vue'
import { jvVideoProps } from './JvVideo'
import '../style/style.css'

defineOptions({ name: 'JvVideo' })

const props = defineProps(jvVideoProps)
const emit = defineEmits<JvVideoEmits>()
const bem = createNamespace('video')

const videoRef = ref<HTMLVideoElement>()

// 暴露组件方法
defineExpose({
  play: () => videoRef.value?.play(),
  pause: () => videoRef.value?.pause(),
  getCurrentTime: () => videoRef.value?.currentTime || 0,
  getDuration: () => videoRef.value?.duration || 0,
})

// 事件处理
const handlePlay = () => emit('play')
const handlePause = () => emit('pause')
const handleEnded = () => emit('ended')
const handleTimeupdate = () => emit('timeupdate', videoRef.value?.currentTime || 0)
const handleError = (event: Event) => emit('error', event)
</script>

<template>
  <div :class="bem.b()">
    <video
      ref="videoRef"
      :src="props.src"
      :poster="props.poster"
      :width="props.width"
      :height="props.height"
      :autoplay="props.autoplay"
      :controls="props.controls"
      :loop="props.loop"
      :muted="props.muted"
      @play="handlePlay"
      @pause="handlePause"
      @ended="handleEnded"
      @timeupdate="handleTimeupdate"
      @error="handleError"
    />
  </div>
</template>
