<script setup lang="ts">
import type { PropType } from 'vue'
import type { ScrollPanelExpose, ScrollPanelOptions } from './types'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import ObserveDOM from '@better-scroll/observe-dom'
import ScrollBar from '@better-scroll/scroll-bar'
import { convertToUnit, createNamespace } from '@jienix/utils'
import { useResizeObserver } from '@vueuse/core'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

defineOptions({
  name: 'JvScrollPanel',
})
const props = defineProps({
  scrollMode: {
    type: Object as PropType<ScrollMode>,
    default: () => ({ vertical: true, horizontal: false }),
  },
  width: {
    type: [String, Number] as PropType<string | number>,
    default: '100%',
  },
  height: {
    type: [String, Number] as PropType<string | number>,
    default: '300px',
  },
  probeType: {
    type: Number,
    default: 3,
  },
  click: {
    type: Boolean,
    default: true,
  },
  scrollDelay: {
    type: Number,
    default: 300,
  },
  scrollEasing: {
    type: String,
    default: 'swipe',
  },
  /**
   * 是否禁用滚动
   */
  disabled: Boolean,
  /**
   * 是否启用滚动条
   */
  scrollbar: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Object as PropType<ScrollPanelOptions>,
    default: () => ({}),
  },
  /**
   * 是否启用吸附
   */
  snap: {
    type: Boolean,
    default: false,
  },
  /** 滚动速度 */
  snapSpeed: {
    type: Number,
    default: 400,
  },
})
const emit = defineEmits(['scrollStart', 'scroll', 'scrollEnd'])
BScroll.use(ScrollBar)
BScroll.use(MouseWheel)
BScroll.use(ObserveDOM)
interface ScrollMode {
  vertical?: boolean
  horizontal?: boolean
}

const bem = createNamespace('scroll-panel')

const wrapperRef = ref<HTMLElement | null>(null)
const bscroll = ref<BScroll | null>(null)
// 自定义滚动条
const verticalBarRef = ref<HTMLElement>()
const horizontalBarRef = ref<HTMLElement>()
const { scrollbar, options } = toRefs(props)
const finalWidth = computed(() => {
  if (!props.width)
    return '100%'
  if (typeof props.width === 'number')
    return convertToUnit(props.width, 'px')
  return props.width
})

const finalHeight = computed(() => {
  if (!props.height)
    return '100%'
  if (typeof props.height === 'number')
    return convertToUnit(props.height, 'px')
  return props.height
})
// 识别是否是移动端
const isMobile = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
})

async function initOptions() {
  if (!verticalBarRef.value || !horizontalBarRef.value)
    return
  // warn:自定义滚动条 下标0为水平滚动条，下标1为垂直滚动条
  const customScrollBar = [horizontalBarRef.value, verticalBarRef.value]

  const initOptions = computed<ScrollPanelOptions>(() => ({
    observeDOM: true,
    freeScroll: true,
    click: isMobile.value ? true : props.click,
    disableTouch: !isMobile.value,
    probeType: props.probeType,
    scrollY: props.scrollMode.vertical,
    scrollX: props.scrollMode.horizontal,
    mouseWheel: {
      speed: 20,
      invert: false,
      easeTime: props.scrollDelay,
    },
    scrollbar: unref(scrollbar)
      ? {
          customElements: customScrollBar,
          fade: false,
          interactive: true,
          scrollbarTrackClickable: true,
        }
      : true,
    momentum: true,
    momentumLimitTime: 0.2,
    momentumLimitDistance: 15,
    snap: props.snap
      ? {
          threshold: 0.1,
          speed: props.snapSpeed,
          easing: {
            style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fn: (t: number) => t * (2 - t),
          },
        }
      : false,
    swipeTime: 2500,
    bounce: {
      top: false,
      bottom: false,
      left: false,
      right: false,
    },
  }))
  const finalOptions: ScrollPanelOptions = {
    ...unref(initOptions),
    ...unref(options),
  }
  return finalOptions
}

function initScroll(finalOptions: ScrollPanelOptions) {
  if (!wrapperRef.value || props.disabled)
    return
  bscroll.value = new BScroll(wrapperRef.value, finalOptions) as BScroll
  // 事件绑定
  bscroll.value?.on('scrollStart', () => emit('scrollStart'))
  bscroll.value?.on('scroll', (pos: { x: number, y: number }) =>
    emit('scroll', pos))
  bscroll.value?.on('scrollEnd', () => emit('scrollEnd'))
}

// 动态的计算滚动条的长度

const resizeObserver = useResizeObserver(wrapperRef, () => {
  bscroll.value?.refresh()
  // 如果是pc端，则不进行刷新
})

onMounted(async () => {
  const finalOptions = await initOptions()
  if (!finalOptions)
    return
  initScroll(finalOptions)
})

watch(
  () => props.disabled,
  (val) => {
    if (val) {
      bscroll.value?.disable()
    }
    else {
      bscroll.value?.enable()
    }
  },
)

onBeforeUnmount(() => {
  bscroll.value?.destroy()
  resizeObserver.stop()
})

function handleKeydown(e: KeyboardEvent) {
  // eslint-disable-next-line no-console
  console.log(e)
}
defineExpose<ScrollPanelExpose>({
  refresh: () => bscroll.value?.refresh(),
  scrollTo: (x: number, y: number, time = 300) =>
    bscroll.value?.scrollTo(x, y, time),
  instance: bscroll.value as BScroll,
})
</script>

<template>
  <div
    ref="wrapperRef"
    :class="[
      bem.e('wrapper'),
      bem.is('disabled', disabled),
      bem.m(`mode-${scrollMode.vertical ? 'vertical' : 'horizontal'}`),
    ]"
    :style="{ width: finalWidth, height: finalHeight }"
    @keydown="handleKeydown"
  >
    <div :class="bem.e('content')">
      <slot :ref="wrapperRef" />
    </div>
    <!-- custom-vertical-scrollbar -->
    <div
      v-if="scrollbar"
      ref="verticalBarRef"
      class="custom-vertical-scrollbar"
    >
      <div class="custom-vertical-indicator" />
    </div>
    <!-- custom-horizontal-scrollbar -->
    <div
      v-if="scrollbar"
      ref="horizontalBarRef"
      class="custom-horizontal-scrollbar"
    >
      <div class="custom-horizontal-indicator" />
    </div>
  </div>
</template>
