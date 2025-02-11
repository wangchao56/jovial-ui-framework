<script setup lang="ts">
import type { Options } from '@better-scroll/core'
import type { PropType } from 'vue'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'
import { createNamespace } from '@jovial/utils'
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
  disabled: Boolean,
  scrollbar: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Object as PropType<Options>,
    default: () => ({}),
  },
  snap: {
    type: Boolean,
    default: false,
  },
  snapSpeed: {
    type: Number,
    default: 400,
  },
})
const emit = defineEmits(['scrollStart', 'scroll', 'scrollEnd'])
BScroll.use(ScrollBar)
BScroll.use(MouseWheel)

interface ScrollMode {
  vertical?: boolean
  horizontal?: boolean
}

const bem = createNamespace('scroll-box')

const wrapperRef = ref<HTMLElement | null>(null)
const bscroll = ref<BScroll | null>(null)

const finalWidth = computed(() => {
  if (typeof props.width === 'number')
    return `${props.width}px`
  return props.width.endsWith('px') ? props.width : `${props.width}px`
})

const finalHeight = computed(() => {
  if (typeof props.height === 'number')
    return `${props.height}px`
  return props.height.endsWith('px') ? props.height : `${props.height}px`
})

function initScroll() {
  if (!wrapperRef.value || props.disabled)
    return

  const options = {
    freeScroll: true,
    click: props.click,
    probeType: props.probeType,
    scrollY: props.scrollMode.vertical,
    scrollX: props.scrollMode.horizontal,
    mouseWheel: {
      speed: 10,
      invert: false,
      easeTime: props.scrollDelay,
    },
    scrollbar: !props.scrollbar
      ? {
          fade: false,
          interactive: true,
        }
      : false,
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
  }

  const finalOptions = {
    ...options,
    ...props.options,
  }

  bscroll.value = new BScroll(wrapperRef.value, finalOptions)

  // 事件绑定
  bscroll.value?.on('scrollStart', () => emit('scrollStart'))
  bscroll.value?.on('scroll', (pos: { x: number, y: number }) => emit('scroll', pos))
  bscroll.value?.on('scrollEnd', () => emit('scrollEnd'))
}

onMounted(() => {
  initScroll()
})

watch(() => props.disabled, (val) => {
  if (val) {
    bscroll.value?.disable()
  }
  else {
    bscroll.value?.enable()
  }
})

onBeforeUnmount(() => {
  bscroll.value?.destroy()
})

defineExpose({
  refresh: () => bscroll.value?.refresh(),
  scrollTo: (x: number, y: number, time = 300) => bscroll.value?.scrollTo(x, y, time),
  instance: bscroll,
})
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.is('disabled', disabled),
      bem.m(`mode-${scrollMode.vertical ? 'vertical' : 'horizontal'}`),
    ]"
    :style="{ width: finalWidth, height: finalHeight }"
  >
    <div ref="wrapperRef" :class="bem.e('wrapper')">
      <div :class="bem.e('content')">
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
@b scroll-box {
  position: relative;
  overflow: hidden;

  @e wrapper {
    height: 100%;
    overflow: hidden;
  }

  @e content {
    min-height: 100%;
    box-sizing: border-box;
  }

  @m disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  @m mode-vertical {
    .jv-scroll-box__wrapper {
      overflow-y: hidden;
    }
  }

  @m mode-horizontal {
    .jv-scroll-box__wrapper {
      overflow-x: hidden;
    }
  }
}
</style>
