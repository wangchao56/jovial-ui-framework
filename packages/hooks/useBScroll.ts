import type { Options } from '@better-scroll/core'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'
import { onMounted, onUnmounted, ref } from 'vue'
// 使用插件
BScroll.use(MouseWheel)
BScroll.use(ScrollBar)
export function useBScroll(
  wrapper: Ref<HTMLElement | null>,
  options?: Options,
) {
  const bscroll = ref<BScroll | null>(null)

  onMounted(() => {
    if (wrapper.value) {
      // 使用插件
      // 初始化 BScroll 实例，并应用传入的配置
      bscroll.value = new BScroll(wrapper.value, options)
    }
  })

  onUnmounted(() => {
    if (bscroll.value) {
      // 销毁 BScroll 实例
      bscroll.value.destroy()
    }
  })

  return {
    bscroll,
  }
}
