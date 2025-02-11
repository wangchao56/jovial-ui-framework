<script setup lang="ts">
import type { InfiniteScrollExpose, JvInfiniteScrollEmits, JvInfiniteScrollProps } from './JvInfiniteScroll'
import BScroll from '@better-scroll/core'
import { createNamespace } from '@jovial/utils'
import { onMounted, onUnmounted, ref, watch } from 'vue'

defineOptions({ name: 'JvInfiniteScroll' })

const props = withDefaults(defineProps<JvInfiniteScrollProps>(), {
  probeType: 3,
  pullup: false,
  pulldown: false,
  data: () => [],
  refreshDelay: 20,
})

const emit = defineEmits<JvInfiniteScrollEmits>()

const bem = createNamespace('infiniteScroll')
const wrapperRef = ref<HTMLElement>()
let scroll: BScroll | null = null

// 初始化滚动
function initScroll() {
  if (!wrapperRef.value)
    return

  scroll = new BScroll(wrapperRef.value, {
    probeType: props.probeType,
    click: true,
    scrollY: true,
    pullUpLoad: props.pullup,
    pullDownRefresh: props.pulldown,
  })

  // 事件绑定
  scroll.on('scroll', (pos: { x: number, y: number }) => {
    emit('scroll', pos)
  })

  scroll.on('scrollEnd', () => {
    if (props.pullup && scroll!.y <= scroll!.maxScrollY + 50) {
      emit('scrollToEnd')
    }
  })

  scroll.on('touchEnd', (pos: { x: number, y: number }) => {
    if (props.pulldown && pos.y > 50) {
      emit('pulldown')
    }
  })

  scroll.on('beforeScrollStart', () => {
    emit('beforeScroll')
  })
}

// 生命周期
onMounted(() => {
  setTimeout(initScroll, 20)
})

onUnmounted(() => {
  scroll?.destroy()
})

// 数据监听
watch(() => props.data, () => {
  setTimeout(() => {
    scroll?.refresh()
  }, props.refreshDelay)
})
// 通过 defineExpose 暴露方法
defineExpose<InfiniteScrollExpose>({
  refresh: () => scroll?.refresh(),
  scrollTo: (x, y, time = 300) => scroll?.scrollTo(x, y, time),
  getScroll: () => scroll,
})
</script>

<template>
  <div ref="wrapperRef" :class="bem.b()" class="jv-infinite-scroll">
    <div class="scroll-content">
      <slot />
    </div>
  </div>
</template>

<style>
.jv-infinite-scroll {
  height: 100%;
  overflow: hidden;
  position: relative;
}

.scroll-content {
  min-height: 100%;
}
</style>
