export { useClickOutside } from './clickOutside'
export { useDefaults } from './defaults'
export type { DefaultsInstance } from './defaults'
export * from './defaults'
export { useGoTo } from './goto'
export type { GoToInstance } from './goto'
export { useMutationObserver } from './mutationObserver'
export type { MutationOptions } from './mutationObserver'
export { useResizeObserver } from './resizeObserver'
export { useExpandedKeys } from './useExpandedKeys'
export type { UseExpandedKeys } from './useExpandedKeys'
export { useProxiedModel } from './useProxiedModel'

export { useSelectedKeys } from './useSelectedKeys'
export { useZIndex } from './useZindex'
// 可改造为通用状态管理
export function useToggle(initial = false) {
  const state = ref(initial)
  const toggle = (value?: boolean) => {
    state.value = value ?? !state.value
  }
  return [state, toggle] as const
}
