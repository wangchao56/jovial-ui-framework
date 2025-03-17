// 可改造为通用状态管理
export function useToggle(initial = false) {
  const state = ref(initial)
  const toggle = (value?: boolean) => {
    state.value = value ?? !state.value
  }
  return [state, toggle] as const
}
