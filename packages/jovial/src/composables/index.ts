export { useClickOutside } from './clickOutside'
export { useDefaults } from './defaults'
export type { DefaultsInstance } from './defaults'
// export { useDisplay } from './display'
// export type { SubmitEventPromise } from './form'

// export type {
//   DisplayBreakpoint,
//   DisplayInstance,
//   DisplayThresholds,
// } from './display'
export { useGoTo } from './goto'
export type { GoToInstance } from './goto'
export type {
  IconAliases,
  IconOptions,
  IconProps,
  IconSet,
  JSXComponent,
} from './icons'
// export { useLayout } from './layout'
// export { useLocale, useRtl } from './locale'
// export type {
//   LocaleInstance,
//   LocaleMessages,
//   LocaleOptions,
//   RtlInstance,
//   RtlOptions,
// } from './locale'
export { useMutationObserver } from './mutationObserver'
export type { MutationOptions } from './mutationObserver'
// export { useProxiedModel } from './proxiedModel'
export { useResizeObserver } from './resizeObserver'

export { useExpandedKeys } from './useExpandedKeys'
export type { UseExpandedKeys } from './useExpandedKeys'

export { useSelectedKeys } from './useSelectedKeys'
export type { UseSelectedKeys } from './useSelectedKeys'

export { useZIndex } from './useZindex'
// 可改造为通用状态管理
export function useToggle(initial = false) {
  const state = ref(initial)
  const toggle = (value?: boolean) => {
    state.value = value ?? !state.value
  }
  return [state, toggle] as const
}
// export { useTheme } from './theme'
// export type { ThemeDefinition, ThemeInstance } from './theme'

// export { useVariant } from './variant'
