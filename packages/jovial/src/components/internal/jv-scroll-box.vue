<script setup lang="ts">
import type { PropType } from 'vue'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'
import { createNamespace } from '@jovial/utils'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

defineOptions({
  name: 'JvScrollBox',
})
const props = defineProps({
  scrollMode: {
    type: Object as PropType<ScrollMode>,
    default: () => ({ vertical: true, horizontal: false }),
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
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

function initScroll() {
  if (!wrapperRef.value || props.disabled)
    return

  bscroll.value = new BScroll(wrapperRef.value, {
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
    scrollbar: {
      fade: false,
      interactive: true,
    },
  })

  // 事件绑定
  bscroll.value.on('scrollStart', () => emit('scrollStart'))
  bscroll.value.on('scroll', (pos: { x: number, y: number }) => emit('scroll', pos))
  bscroll.value.on('scrollEnd', () => emit('scrollEnd'))
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
    :style="{ width, height }"
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
