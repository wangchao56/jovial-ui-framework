// Types
import type { EffectScope, WatchSource } from 'vue'

// Utilities
import { effectScope, onScopeDispose, watch } from 'vue'

/**
 * 切换作用域
 * @param source 监听的源
 * @param fn 执行的函数
 * @example
 * ```ts
 * useToggleScope(isActive, () => {
 *   // 执行的函数
 * })
 * ```
 * 优势特点：
 * - 条件触发：自动响应响应式条件变化
 * - 安全隔离：每个作用域独立运行/清理副作用
 * - 热重置：通过 reset 方法实现不销毁父级的情况下更新副作用
 * - 内存安全：多层级的自动清理机制防止内存泄漏
 */
export function useToggleScope(
  source: WatchSource<boolean>,
  fn: (reset: () => void) => void,
) {
  let scope: EffectScope | undefined
  function start() {
    scope = effectScope()
    scope.run(() =>
      fn.length
        ? fn(() => {
            scope?.stop()
            start()
          })
        : (fn as any)(),
    )
  }

  watch(
    source,
    (active) => {
      if (active && !scope) {
        start()
      }
      else if (!active) {
        scope?.stop()
        scope = undefined
      }
    },
    { immediate: true },
  )

  onScopeDispose(() => {
    scope?.stop()
  })
}
