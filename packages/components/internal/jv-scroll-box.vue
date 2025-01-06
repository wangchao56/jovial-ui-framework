<template>
  <div class="custom-scrollbar-container">
    <div ref="wrapperRef" class="custom-scrollbar-wrapper">
      <div class="custom-scrollbar-content">
        <slot></slot>
      </div>
      <!-- custom-vertical-scrollbar-->
      <div
        v-if="scrollmode.vertical"
        class="custom-vertical-scrollbar"
        ref="verticalRef"
      >
        <div class="custom-vertical-indicator"></div>
      </div>
      <!-- custom-horizontal-scrollbar-->
      <div
        v-if="scrollmode.horizontal"
        class="custom-horizontal-scrollbar"
        ref="horizontalRef"
      >
        <div class="custom-horizontal-indicator"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BScroll from '@better-scroll/core'
import ScrollBar from '@better-scroll/scroll-bar'
import { useBScroll } from '../../hooks'
import MouseWheel from '@better-scroll/mouse-wheel'
BScroll.use(ScrollBar)
BScroll.use(MouseWheel)

defineOptions({
  name: 'JvScrollBox'
})

const props = defineProps({
  scrollMode: {
    type: Object as PropType<{
      vertical: boolean
      horizontal: boolean
    }>,
    default() {
      return {
        vertical: true,
        horizontal: false
      }
    }
  }
})

const wrapperRef = ref<HTMLElement | null>(null)
const horizontalRef = ref<HTMLElement>()
const verticalRef = ref<HTMLElement>()
const bscroll = ref<BScroll | null>(null)
const scrollmode = computed(() => ({
  vertical: props.scrollMode?.vertical ?? true,
  horizontal: props.scrollMode?.horizontal ?? false
}))

onMounted(() => {
  if (wrapperRef.value) {
    console.log(2)
    // 使用插件
    // 初始化 BScroll 实例，并应用传入的配置
    bscroll.value = new BScroll(wrapperRef.value, {
      freeScroll: true,
      click: true,
      scrollY: scrollmode.value.vertical,
      scrollX: scrollmode.value.horizontal,
      mouseWheel: {
        speed: 10,
        invert: false,
        easeTime: 300
      },
      scrollbar: {
        customElements: [horizontalRef.value!, verticalRef.value!],
        fade: false,
        interactive: true,
        scrollbarTrackClickable: true
      }
    })
  }
  nextTick(() => {
    console.log('nextTick')

    if (bscroll.value) {
      // 刷新 BScroll 实例，以适应新的内容或尺寸变化
      bscroll.value.refresh()
    }
  })
})

onUnmounted(() => {
  if (bscroll.value) {
    // 销毁 BScroll 实例
    bscroll.value.destroy()
  }
})
</script>

<style lang="css" scoped>
.custom-scrollbar-container {
  .custom-scrollbar-wrapper {
    position: relative;
    width: 280px;
    height: 280px;
    overflow: hidden;
  }

  .custom-scrollbar-content {
    max-width: none;
  }

  .custom-vertical-scrollbar {
    position: absolute;
    top: 50%;
    right: 10px;
    height: 100%;
    width: 7px;
    border-radius: 6px;
    transform: translateY(-50%) translateZ(0);
    background-color: rgba(200, 200, 200, 0.3);
  }

  .custom-vertical-indicator {
    width: 100%;
    height: 20px;
    border-radius: 6px;
    background-color: #db8090;
  }

  .custom-horizontal-scrollbar {
    position: absolute;
    left: 50%;
    bottom: 10px;
    /* width: 100px; */
    height: 7px;
    border-radius: 6px;
    transform: translateX(-50%) translateZ(0);
    background-color: rgba(200, 200, 200, 0.3);
  }

  .custom-horizontal-indicator {
    height: 100%;
    width: 20px;
    border-radius: 6px;
    background-color: #db8090;
  }
}
</style>
