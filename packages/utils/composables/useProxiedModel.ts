import { computed, getCurrentInstance, type Ref } from 'vue'

export function useProxiedModel<T>(
  props: any,
  prop: string,
  defaultValue?: T,
): Ref<T> {
  const vm = getCurrentInstance()!
  const internal = computed({
    get: () => props[prop] ?? defaultValue,
    set: (val: T) => {
      if (val === props[prop])
        return
      vm.emit(`update:${prop}`, val)
    },
  })
  return internal
}
