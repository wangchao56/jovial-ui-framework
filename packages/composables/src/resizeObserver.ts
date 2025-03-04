import type { TemplateRef } from '@jienix/utils'
// Types
import type { DeepReadonly, Ref } from 'vue'
import { IN_BROWSER, templateRef } from '@jienix/utils'

// Utilities
import { onBeforeUnmount, readonly, ref, watch } from 'vue'

interface ResizeState {
  resizeRef: TemplateRef
  contentRect: DeepReadonly<Ref<DOMRectReadOnly | undefined>>
}

/**
 * 元素尺寸变化监听钩子
 * 作用：观察DOM元素尺寸变化并返回测量结果
 *
 * @param callback - 尺寸变化回调函数（可选）
 * @param box - 测量模式：'content'内容区域 | 'border'边框区域（默认'content'）
 * @returns {ResizeState} 包含模板引用和尺寸数据的对象
 *
 * 核心功能：
 * 1. 自动绑定/解绑观察目标
 * 2. 支持两种测量模式
 * 3. 自动清理观察器
 * 4. 响应式尺寸数据
 */
export function useResizeObserver(
  callback?: ResizeObserverCallback,
  box: 'content' | 'border' = 'content',
): ResizeState {
  const resizeRef = templateRef()
  const contentRect = ref<DOMRectReadOnly>()

  if (IN_BROWSER) {
    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      callback?.(entries, observer)

      if (!entries.length)
        return

      if (box === 'content') {
        contentRect.value = entries[0].contentRect
      }
      else {
        contentRect.value = entries[0].target.getBoundingClientRect()
      }
    })

    onBeforeUnmount(() => {
      observer.disconnect()
    })

    watch(
      () => resizeRef.el,
      (newValue, oldValue) => {
        if (oldValue) {
          observer.unobserve(oldValue)
          contentRect.value = undefined
        }

        if (newValue)
          observer.observe(newValue)
      },
      {
        flush: 'post',
      },
    )
  }

  return {
    resizeRef,
    contentRect: readonly(contentRect),
  }
}
