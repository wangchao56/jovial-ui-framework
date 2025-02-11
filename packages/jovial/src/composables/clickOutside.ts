import type { Ref } from 'vue'
import { onMounted, onUnmounted, unref } from 'vue'

export function useClickOutside(ref: Ref<HTMLElement | null | undefined>, handler: (e: MouseEvent | TouchEvent | PointerEvent) => void) {
  const listener = (event: MouseEvent | TouchEvent | PointerEvent) => {
    if (unref(ref) && event.target) { // 判断点击事件是否在ref元素内部
      if (!ref.value?.contains(event.target as HTMLElement)) { // 点击事件不在ref元素内部，则执行handler函数
        handler(event)
      }
    }
  }

  onMounted(() => {
    document.addEventListener('mousedown', listener, { passive: true })
    document.addEventListener('touchstart', listener, { passive: true })
    document.addEventListener('pointerdown', listener, { passive: true })
  })

  onUnmounted(() => {
    document.removeEventListener('mousedown', listener)
    document.removeEventListener('touchstart', listener)
    document.removeEventListener('pointerdown', listener)
  })
}
