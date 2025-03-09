<script setup lang="ts">
import type { JvCarouselEmits, JvCarouselSlots } from './JvCarousel'
import JvIcon from '@components/JvIcon'
import { useLocale } from '@jienix/jovial-locale'
import { createNamespace } from '@jienix/utils'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { jvCarouselProps } from './JvCarousel'

defineOptions({ name: 'JvCarousel', inheritAttrs: false })

const props = defineProps(jvCarouselProps)
const emit = defineEmits<JvCarouselEmits>()
defineSlots<JvCarouselSlots>()
const locale = useLocale()
const bem = createNamespace('carousel')

// 当前激活项
const activeIndex = ref(props.modelValue)
// 轮播项列表
const items = ref<HTMLElement[]>([])
// 是否正在切换
const isAnimating = ref(false)
// 自动播放定时器
let timer: NodeJS.Timeout | null = null

// 计算轮播容器样式
const containerStyle = computed(() => ({
  transform: props.direction === 'horizontal'
    ? `translateX(-${activeIndex.value * 100}%)`
    : `translateY(-${activeIndex.value * 100}%)`,
  transition: isAnimating.value ? `transform ${props.duration}ms` : '',
}))

// 获取轮播项列表
function getItems() {
  const container = document.querySelector('.jv-carousel__container')
  if (container) {
    items.value = Array.from(container.children) as HTMLElement[]
  }
}

// 切换到指定项
function goto(index: number) {
  if (isAnimating.value)
    return

  const total = items.value.length
  if (total === 0)
    return

  // 处理循环播放
  if (props.loop) {
    if (index < 0) {
      index = total - 1
    }
    else if (index >= total) {
      index = 0
    }
  }
  else {
    if (index < 0 || index >= total)
      return
  }

  isAnimating.value = true
  activeIndex.value = index
  emit('update:modelValue', index)
  emit('change', index)

  setTimeout(() => {
    isAnimating.value = false
  }, props.duration)
}

// 切换到上一项
function prev() {
  goto(activeIndex.value - 1)
}

// 切换到下一项
function next() {
  goto(activeIndex.value + 1)
}

// 开始自动播放
function startAutoplay() {
  if (!props.autoplay || timer)
    return
  timer = setInterval(() => {
    next()
  }, props.interval)
}

// 停止自动播放
function stopAutoplay() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

// 处理鼠标悬停
function handleMouseenter() {
  if (props.pauseOnHover) {
    stopAutoplay()
  }
}

function handleMouseleave() {
  if (props.pauseOnHover) {
    startAutoplay()
  }
}

// 监听值变化
watch(
  () => props.modelValue,
  (val) => {
    goto(val)
  },
)

// 组件挂载时初始化
onMounted(() => {
  getItems()
  startAutoplay()
})

// 组件卸载前清理
onBeforeUnmount(() => {
  stopAutoplay()
})

// 暴露方法
defineExpose({
  prev,
  next,
  goto,
})
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.m(direction),
      bem.m(effect),
    ]" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave"
  >
    <!-- 轮播容器 -->
    <div :class="bem.e('container')" :style="containerStyle">
      <slot />
    </div>

    <!-- 指示器 -->
    <div
      v-if="indicatorPosition !== 'none'" :class="[
        bem.e('indicators'),
        bem.em('indicators', indicatorPosition),
      ]"
    >
      <template v-if="$slots.indicator">
        <slot
          v-for="(_, index) in items" :key="index" name="indicator" :index="index"
          :active="index === activeIndex"
        />
      </template>
      <template v-else>
        <div
          v-for="(_, index) in items" :key="index" :class="[
            bem.e('indicator'),
            bem.is('active', index === activeIndex),
          ]" @click="goto(index)"
        />
      </template>
    </div>

    <!-- 箭头 -->
    <template v-if="arrow && items.length > 1">
      <template v-if="$slots.arrow">
        <slot :key="locale.t('arrow')" name="arrow" :prev="prev" :next="next" />
      </template>
      <template v-else>
        <div :class="[bem.e('arrow'), bem.em('arrow', 'prev')]" @click="prev">
          <JvIcon name="chevron-left" />
        </div>
        <div :class="[bem.e('arrow'), bem.em('arrow', 'next')]" @click="next">
          <JvIcon name="chevron-right" />
        </div>
      </template>
    </template>
  </div>
</template>
