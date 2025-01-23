import { ref } from 'vue'

const zIndex = ref(2000)

export function useZIndex() {
  const next = () => {
    zIndex.value += 1
    return zIndex.value
  }

  return {
    next,
    current: zIndex,
  }
}
