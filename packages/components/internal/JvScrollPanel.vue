<script setup lang="ts">
import type { PropType } from 'vue'
import type { ScrollPanelExpose, ScrollPanelOptions } from './types'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import ObserveDOM from '@better-scroll/observe-dom'
import ScrollBar from '@better-scroll/scroll-bar'
import { convertToUnit, createNamespace, IN_BROWSER } from '@jienix/utils'
import { useResizeObserver } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, ref, toRefs, unref, watch } from 'vue'

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
  /**
   * 滚动条颜色
   */
  scrollbarColor: {
    type: String,
    default: 'primary',
  },
  /**
   * 键盘导航步长
   */
  keyStep: {
    type: Number,
    default: 40,
  },
  /**
   * 是否启用键盘导航
   */
  keyboardNavigation: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否使用原生滚动
   */
  useNative: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否在PC端使用原生滚动
   */
  nativeOnDesktop: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否在移动端使用原生滚动
   */
  nativeOnMobile: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否平滑滚动
   */
  smoothScroll: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['scrollStart', 'scroll', 'scrollEnd'])

console.log('JvScrollPanel', IN_BROWSER)

BScroll.use(ScrollBar)
BScroll.use(MouseWheel)
BScroll.use(ObserveDOM)
interface ScrollMode {
  vertical?: boolean
  horizontal?: boolean
}

const bem = createNamespace('scroll-panel')

const wrapperRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
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

// 是否使用原生滚动
const shouldUseNative = computed(() => {
  if (props.useNative)
    return true
  if (isMobile.value)
    return props.nativeOnMobile
  return props.nativeOnDesktop
})

// 原生滚动样式
const nativeScrollStyle = computed(() => {
  if (!shouldUseNative.value)
    return {}

  const style: Record<string, string> = {
    overflow: 'auto',
  }

  if (props.smoothScroll) {
    style['scroll-behavior'] = 'smooth'
  }

  if (props.scrollMode.vertical && !props.scrollMode.horizontal) {
    style['overflow-x'] = 'hidden'
    style['overflow-y'] = 'auto'
  }
  else if (!props.scrollMode.vertical && props.scrollMode.horizontal) {
    style['overflow-x'] = 'auto'
    style['overflow-y'] = 'hidden'
  }

  return style
})

// 原生滚动事件处理
let scrollStarted = false
let scrollTimer: number | null = null

function handleNativeScroll(e: Event) {
  if (!shouldUseNative.value || !wrapperRef.value)
    return

  const target = e.target as HTMLElement
  const scrollLeft = target.scrollLeft
  const scrollTop = target.scrollTop
  const pos = { x: -scrollLeft, y: -scrollTop }

  if (!scrollStarted) {
    scrollStarted = true
    emit('scrollStart')
  }

  emit('scroll', pos)

  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }

  scrollTimer = window.setTimeout(() => {
    scrollStarted = false
    emit('scrollEnd')
  }, 150) as unknown as number
}

async function initOptions() {
  if (shouldUseNative.value)
    return null

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
    snap: props.snap && isMobile.value
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
  if (!wrapperRef.value || props.disabled || shouldUseNative.value)
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
  if (shouldUseNative.value)
    return
  bscroll.value?.refresh()
})

onMounted(async () => {
  if (shouldUseNative.value)
    return

  const finalOptions = await initOptions()
  if (!finalOptions)
    return
  initScroll(finalOptions)
})

watch(
  () => props.disabled,
  (val) => {
    if (shouldUseNative.value)
      return

    if (val) {
      bscroll.value?.disable()
    }
    else {
      bscroll.value?.enable()
    }
  },
)

watch(
  () => shouldUseNative.value,
  (useNative, oldValue) => {
    if (useNative === oldValue)
      return

    if (useNative) {
      // 切换到原生滚动
      bscroll.value?.destroy()
      bscroll.value = null
    }
    else {
      // 切换到 BetterScroll
      initOptions().then((finalOptions) => {
        if (!finalOptions)
          return
        initScroll(finalOptions)
      })
    }
  },
)

onBeforeUnmount(() => {
  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }

  if (!shouldUseNative.value && bscroll.value) {
    bscroll.value.destroy()
  }

  resizeObserver.stop()
})

function handleKeydown(e: KeyboardEvent) {
  if (!props.keyboardNavigation)
    return

  if (shouldUseNative.value && wrapperRef.value) {
    // 原生滚动的键盘导航
    const step = props.keyStep

    switch (e.key) {
      case 'ArrowUp':
        if (props.scrollMode.vertical) {
          e.preventDefault()
          wrapperRef.value.scrollBy({
            top: -step,
            behavior: props.smoothScroll ? 'smooth' : 'auto',
          })
        }
        break
      case 'ArrowDown':
        if (props.scrollMode.vertical) {
          e.preventDefault()
          wrapperRef.value.scrollBy({
            top: step,
            behavior: props.smoothScroll ? 'smooth' : 'auto',
          })
        }
        break
      case 'ArrowLeft':
        if (props.scrollMode.horizontal) {
          e.preventDefault()
          wrapperRef.value.scrollBy({
            left: -step,
            behavior: props.smoothScroll ? 'smooth' : 'auto',
          })
        }
        break
      case 'ArrowRight':
        if (props.scrollMode.horizontal) {
          e.preventDefault()
          wrapperRef.value.scrollBy({
            left: step,
            behavior: props.smoothScroll ? 'smooth' : 'auto',
          })
        }
        break
      case 'Home':
        if (props.scrollMode.vertical) {
          e.preventDefault()
          wrapperRef.value.scrollTo({
            top: 0,
            behavior: props.smoothScroll ? 'smooth' : 'auto',
          })
        }
        break
      case 'End':
        if (props.scrollMode.vertical) {
          e.preventDefault()
          wrapperRef.value.scrollTo({
            top: wrapperRef.value.scrollHeight,
            behavior: props.smoothScroll ? 'smooth' : 'auto',
          })
        }
        break
      case 'PageUp':
        if (props.scrollMode.vertical) {
          e.preventDefault()
          wrapperRef.value.scrollBy({
            top: -wrapperRef.value.clientHeight,
            behavior: props.smoothScroll ? 'smooth' : 'auto',
          })
        }
        break
      case 'PageDown':
        if (props.scrollMode.vertical) {
          e.preventDefault()
          wrapperRef.value.scrollBy({
            top: wrapperRef.value.clientHeight,
            behavior: props.smoothScroll ? 'smooth' : 'auto',
          })
        }
        break
    }
    return
  }

  if (!bscroll.value)
    return

  const step = props.keyStep
  const currentPos = bscroll.value.getPosition()

  switch (e.key) {
    case 'ArrowUp':
      if (props.scrollMode.vertical) {
        e.preventDefault()
        bscroll.value.scrollBy(0, step, 300)
      }
      break
    case 'ArrowDown':
      if (props.scrollMode.vertical) {
        e.preventDefault()
        bscroll.value.scrollBy(0, -step, 300)
      }
      break
    case 'ArrowLeft':
      if (props.scrollMode.horizontal) {
        e.preventDefault()
        bscroll.value.scrollBy(step, 0, 300)
      }
      break
    case 'ArrowRight':
      if (props.scrollMode.horizontal) {
        e.preventDefault()
        bscroll.value.scrollBy(-step, 0, 300)
      }
      break
    case 'Home':
      if (props.scrollMode.vertical) {
        e.preventDefault()
        bscroll.value.scrollTo(currentPos.x, 0, 500)
      }
      break
    case 'End':
      if (props.scrollMode.vertical) {
        e.preventDefault()
        const maxScrollY = bscroll.value.maxScrollY
        bscroll.value.scrollTo(currentPos.x, maxScrollY, 500)
      }
      break
    case 'PageUp':
      if (props.scrollMode.vertical) {
        e.preventDefault()
        bscroll.value.scrollBy(0, step * 5, 500)
      }
      break
    case 'PageDown':
      if (props.scrollMode.vertical) {
        e.preventDefault()
        bscroll.value.scrollBy(0, -step * 5, 500)
      }
      break
  }
}

// 原生滚动方法
function nativeScrollTo(x: number, y: number, time = 300) {
  if (!wrapperRef.value)
    return

  wrapperRef.value.scrollTo({
    left: -x,
    top: -y,
    behavior: time > 0 && props.smoothScroll ? 'smooth' : 'auto',
  })
}

function nativeScrollBy(x: number, y: number, time = 300) {
  if (!wrapperRef.value)
    return

  wrapperRef.value.scrollBy({
    left: -x,
    top: -y,
    behavior: time > 0 && props.smoothScroll ? 'smooth' : 'auto',
  })
}

function nativeScrollToElement(el: HTMLElement, time = 300) {
  if (!wrapperRef.value)
    return

  el.scrollIntoView({
    behavior: time > 0 && props.smoothScroll ? 'smooth' : 'auto',
    block: 'nearest',
    inline: 'nearest',
  })
}

// 统一的滚动方法
function scrollTo(x: number, y: number, time = 300) {
  if (shouldUseNative.value) {
    nativeScrollTo(x, y, time)
  }
  else {
    bscroll.value?.scrollTo(x, y, time)
  }
}

function scrollBy(x: number, y: number, time = 300) {
  if (shouldUseNative.value) {
    nativeScrollBy(x, y, time)
  }
  else {
    bscroll.value?.scrollBy(x, y, time)
  }
}

function scrollToElement(el: HTMLElement, time = 300, offsetX = 0, offsetY = 0) {
  if (shouldUseNative.value) {
    nativeScrollToElement(el, time)
  }
  else {
    bscroll.value?.scrollToElement(el, time, offsetX, offsetY)
  }
}

function refresh() {
  if (!shouldUseNative.value) {
    bscroll.value?.refresh()
  }
}

// 扩展暴露的方法
defineExpose<ScrollPanelExpose>({
  refresh,
  scrollTo,
  scrollBy,
  scrollToElement,
  stop: () => bscroll.value?.stop(),
  enable: () => bscroll.value?.enable(),
  disable: () => bscroll.value?.disable(),
  instance: bscroll as Ref<BScroll | null>,
})
</script>

<template>
  <div
    ref="wrapperRef"
    :class="[
      bem.e('wrapper'),
      bem.is('disabled', disabled),
      bem.is('native', shouldUseNative),
      bem.m(`mode-${scrollMode.vertical ? 'vertical' : 'horizontal'}`),
    ]"
    :style="{
      width: finalWidth,
      height: finalHeight,
      ...nativeScrollStyle,
    }"
    tabindex="0"
    @keydown="handleKeydown"
    @scroll="handleNativeScroll"
  >
    <div ref="contentRef" :class="bem.e('content')">
      <slot />
    </div>
    <!-- custom-vertical-scrollbar -->
    <div
      v-if="scrollbar && !shouldUseNative"
      ref="verticalBarRef"
      class="custom-vertical-scrollbar" :class="[
        `bg-${scrollbarColor}-transparent`,
      ]"
    >
      <div
        class="custom-vertical-indicator" :class="[
          `bg-${scrollbarColor}`,
        ]"
      />
    </div>
    <!-- custom-horizontal-scrollbar -->
    <div
      v-if="scrollbar && !shouldUseNative"
      ref="horizontalBarRef"
      class="custom-horizontal-scrollbar" :class="[
        `bg-${scrollbarColor}-transparent`,
      ]"
    >
      <div
        class="custom-horizontal-indicator" :class="[
          `bg-${scrollbarColor}`,
        ]"
      />
    </div>
  </div>
</template>

<style lang="scss">
.jv-scroll-panel {
  &__wrapper {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    outline: none;

    &--mode-vertical {
      overflow-y: hidden;
    }

    &--mode-horizontal {
      overflow-x: hidden;
    }

    &.is-disabled {
      pointer-events: none;
    }

    &.is-native {
      // 原生滚动条样式
      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
      }

      &::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: 3px;
      }

      &:hover::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.4);
      }

      // Firefox 滚动条样式
      scrollbar-width: thin;
      scrollbar-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.05);

      &:hover {
        scrollbar-color: rgba(0, 0, 0, 0.4) rgba(0, 0, 0, 0.05);
      }
    }
  }

  &__content {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .custom-vertical-scrollbar {
    position: absolute;
    right: 2px;
    top: 2px;
    bottom: 2px;
    width: 6px;
    border-radius: 3px;
    z-index: 10;
    opacity: 0.2;
    transition: opacity 0.3s;

    .custom-vertical-indicator {
      position: absolute;
      width: 100%;
      min-height: 20px;
      border-radius: 3px;
    }
  }

  .custom-horizontal-scrollbar {
    position: absolute;
    left: 2px;
    right: 2px;
    bottom: 2px;
    height: 6px;
    border-radius: 3px;
    z-index: 10;
    opacity: 0.2;
    transition: opacity 0.3s;

    .custom-horizontal-indicator {
      position: absolute;
      height: 100%;
      min-width: 20px;
      border-radius: 3px;
    }
  }

  &__wrapper:hover {
    .custom-vertical-scrollbar,
    .custom-horizontal-scrollbar {
      opacity: 0.6;
    }
  }

  &__wrapper:focus-visible {
    outline: 2px solid var(--jv-theme-primary);
    outline-offset: -2px;
  }
}
</style>
