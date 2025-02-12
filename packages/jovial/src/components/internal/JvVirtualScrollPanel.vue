<script setup>
import BScroll from '@better-scroll/core'
import { useVirtualList } from '@vueuse/core'
import { computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  itemHeight: {
    type: Number,
    default: 40,
  },
  containerHeight: {
    type: Number,
    default: 400,
  },
})

let bs = null

// 使用vueuse的虚拟列表
const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
  props.items,
  {
    itemHeight: props.itemHeight,
    overscan: 10,
  },
)

const { ref: containerRef } = containerProps
const { ref: wrapperRef } = wrapperProps

const totalHeight = computed(() => props.items.length * props.itemHeight)
const offset = computed(() => list.value[0]?.offset || 0)
const visibleData = computed(() => list.value.map(({ data, index }) => ({ data, index })))

// 初始化BetterScroll
function initScroll() {
  bs = new BScroll(containerRef.value, {
    scrollY: true,
    probeType: 3,
    click: true,
    bounce: false,
  })

  bs.on('scroll', (pos) => {
    scrollTo(pos.y)
  })
}

// 响应容器高度变化
watch(() => props.containerHeight, (val) => {
  containerRef.value.style.height = `${val}px`
  bs?.refresh()
})

onMounted(() => {
  containerRef.value.style.height = `${props.containerHeight}px`
  initScroll()
})

onUnmounted(() => {
  bs?.destroy()
})
</script>

<template>
  <div v-bind="containerProps" ref="containerRef" class="virtual-scroll-container">
    <div
      v-bind="wrapperProps"
      ref="wrapperRef"
      class="virtual-scroll-wrapper"
      :style="{ height: `${totalHeight}px` }"
    >
      <div
        class="virtual-scroll-content"
        :style="{ transform: `translateY(${offset}px)` }"
      >
        <slot
          v-for="item in visibleData"
          :item="item"
          :index="item.index"
        />
      </div>
    </div>
  </div>
</template>

<style lang="post" scoped>
.virtual-scroll-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.virtual-scroll-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
}

.virtual-scroll-content {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
</style>
