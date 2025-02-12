import { consoleWarn } from '@jovial/utils'
import { type ComponentPublicInstance, getCurrentInstance, type Ref, ref } from 'vue'

export interface UseParentOptions {
  /** 父组件名称 */
  name?: string
  /** CSS 选择器 */
  selector?: string
  /** 注入的key */
  injectKey?: symbol | string
  /** 是否跨层级查找 */
  crossLevel?: boolean
}

/**
 * 父组件
 * @param options 选项
 * @returns 父组件
 */
export function useParent(
  options: UseParentOptions = {},
): Ref<HTMLElement | ComponentPublicInstance | null> {
  const parentRef = ref<HTMLElement | ComponentPublicInstance | null>(null)
  const instance = getCurrentInstance()

  const findParent = () => {
    if (!instance?.parent) {
      consoleWarn('useParent: 未找到父组件')
      return null
    }

    let parent: ComponentPublicInstance | null = instance.parent.proxy

    // 通过注入key查找
    if (options.injectKey && parent?.provides) {
      if (parent.provides[options.injectKey as symbol]) {
        return parent
      }
    }

    // 通过组件名查找
    if (options.name) {
      while (parent && parent.$options.name !== options.name) {
        parent = parent.$parent
        if (!options.crossLevel)
          break
      }
    }

    // 通过选择器查找DOM
    if (options.selector && parent?.$el) {
      const el = parent.$el.closest(options.selector)
      if (el)
        return el
    }

    return parent?.$el || parent
  }

  // 使用 nextTick 确保DOM已挂载
  nextTick(() => {
    parentRef.value = findParent()
  })

  return parentRef
}
