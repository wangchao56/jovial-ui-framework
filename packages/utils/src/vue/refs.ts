import type { ComponentPublicInstance, Ref } from 'vue'
import isFunction from 'lodash-es/isFunction'

export type RefSetter = (
  el: Element | ComponentPublicInstance | undefined
) => void

// Start of Selection
/**
 * 组合多个 Ref，将它们合并为一个函数 Ref。
 * 当该组合 Ref 被调用时，会依次设置所有传入的 Ref。
 *
 * @param refs - 任意数量的 Ref 或 RefSetter 函数
 * @returns 一个新的 RefSetter 函数
 */
export function composeRefs(...refs: (Ref<HTMLElement | undefined> | RefSetter)[]) {
  return (el: Element | ComponentPublicInstance | null) => {
    refs.forEach((ref) => {
      if (isFunction(ref)) {
        ref(el as Element | ComponentPublicInstance)
      }
      else {
        ref.value = el as HTMLElement | undefined
      }
    })
  }
}
