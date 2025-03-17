// Types
import type { ComponentInternalInstance, InjectionKey } from 'vue'

// Utilities
import { getCurrentInstance } from './getCurrentInstance'

export function injectSelf<T>(
  key: InjectionKey<T> | string,
  vm?: ComponentInternalInstance
): T | undefined
/**
 * 在当前组件实例中注入一个值
 * @param key - 注入的键，可以是 InjectionKey 或字符串
 * @param vm - 可选的组件实例，默认为当前组件实例
 * @returns 注入的值，如果不存在则返回 undefined
 */
export function injectSelf(
  key: InjectionKey<any> | string,
  vm = getCurrentInstance('injectSelf'),
) {
  // 获取组件实例的 provides 对象
  const { provides } = vm as any

  // 如果 provides 对象存在，并且键存在于 provides 对象中
  if (provides && (key as string | symbol) in provides) {
    // 返回 provides 对象中对应键的值
    return provides[key as string]
  }

  // 如果键不存在于 provides 对象中，返回 undefined
  return undefined
}
