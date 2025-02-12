<script setup lang="ts">
import type { PropType } from 'vue'
import type { ScrollPanelOptions } from './types'
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
  if (typeof props.width === 'number')
    return `${props.width}px`
  return props.width.endsWith('px') ? props.width : `${props.width}px`
})

const finalHeight = computed(() => {
  if (typeof props.height === 'number')
    return `${props.height}px`
  return props.height.endsWith('px') ? props.height : `${props.height}px`
})
async function initOptions() {
  if (!verticalBarRef.value || !horizontalBarRef.value)
    return
  // warn:自定义滚动条 下标0为水平滚动条，下标1为垂直滚动条
  const customScrollBar = [horizontalBarRef.value, verticalBarRef.value]
  const initOptions = computed<ScrollPanelOptions>(() => ({
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
  bscroll.value?.on('scroll', (pos: { x: number, y: number }) => emit('scroll', pos))
  bscroll.value?.on('scrollEnd', () => emit('scrollEnd'))
}

onMounted(async () => {
  const finalOptions = await initOptions()
  if (!finalOptions)
    return
  initScroll(finalOptions)
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
      <!-- custom-vertical-scrollbar -->
      <div v-if="scrollbar" ref="verticalBarRef" class="custom-vertical-scrollbar">
        <div class="custom-vertical-indicator" />
      </div>
      <!-- custom-horizontal-scrollbar -->
      <div v-if="scrollbar" ref="horizontalBarRef" class="custom-horizontal-scrollbar">
        <div class="custom-horizontal-indicator" />
      </div>
    </div>
  </div>
</template>

<style lang="post" scoped>
@b scroll-panel {
  position: relative;
  overflow: hidden;

  @e wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  @e content {
    min-height: max-content;
    min-width: max-content;
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

.custom-vertical-scrollbar {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 100%;
  background-color: rgba(200, 200, 200, 0.3);
  /* 鼠标悬停时 */
  &:hover {
    background-color: rgba(200, 200, 200, 0.6);
  }
  .custom-vertical-indicator {
    background-color: #697572;
    width: 100%;
    height: 40px;
    border-radius: 25px;
  }
}

.custom-horizontal-scrollbar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10px;
  transform: translateZ(0);
  background-color: rgba(200, 200, 200, 0.3);
  &:hover {
    background-color: rgba(200, 200, 200, 0.6);
  }
  .custom-horizontal-indicator {
    background-color: #697572b5;
    width: 40px;
    height: 100%;
    border-radius: 25px;
    &:hover {
      background-color: #697572;
      cursor: pointer;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
