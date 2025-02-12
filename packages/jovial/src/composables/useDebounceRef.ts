import { customRef } from 'vue'

/**
 * 防抖ref
 * @param value 需要防抖的值
 * @param wait 防抖时间
 * @returns 防抖后的值
 */
export function useDebounceRef(value: any, wait: number) {
  let timer: NodeJS.Timeout | null = null
  return customRef((track, trigger) => {
    return {
      get: () => {
        track()
        return value
      },
      set: (newValue: any) => {
        if (timer) {
          clearTimeout(timer)
        }
        else {
          timer = setTimeout(() => {
            value = newValue
            trigger()
          }, wait)
        }
      },
    }
  })
}
