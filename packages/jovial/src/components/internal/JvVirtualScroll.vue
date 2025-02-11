<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'

defineOptions({
  name: 'JvVirtualScroll',
})

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  itemSize: {
    type: Number,
    default: 40,
  },
  buffer: {
    type: Number,
    default: 2,
  },
})

const emit = defineEmits(['itemClick'])

const containerRef = ref<HTMLElement>()
const scrollTop = ref(0)
const visibleCount = computed(() => Math.ceil((containerRef.value?.clientHeight || 0) / props.itemSize) + props.buffer * 2)
const startIndex = computed(() => Math.max(0, Math.floor(scrollTop.value / props.itemSize) - props.buffer))
const endIndex = computed(() => Math.min(props.items.length, startIndex.value + visibleCount.value))
const offsetY = computed(() => startIndex.value * props.itemSize)

const visibleItems = computed(() => props.items.slice(startIndex.value, endIndex.value))

const containerStyle = computed<CSSProperties>(() => ({
  height: `${props.items.length * props.itemSize}px`,
  position: 'relative',
}))

const listStyle = computed<CSSProperties>(() => ({
  transform: `translateY(${offsetY.value}px)`,
}))

function handleScroll(e: Event) {
  scrollTop.value = (e.target as HTMLElement).scrollTop
}

onMounted(() => {
  containerRef.value?.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  containerRef.value?.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div ref="containerRef" class="jv-virtual-scroll-container" :style="{ height: '100%', overflow: 'auto' }">
    <div :style="containerStyle">
      <div :style="listStyle">
        <div
          v-for="(item, index) in visibleItems"
          :key="startIndex + index"
          :style="{ height: `${itemSize}px` }"
          @click="emit('itemClick', item)"
        >
          <slot :item="item" :index="startIndex + index" />
        </div>
      </div>
    </div>
  </div>
</template>
