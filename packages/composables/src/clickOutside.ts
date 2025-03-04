import { onClickOutside } from '@vueuse/core'

export function useClickOutside(node: HTMLElement, callback: () => void) {
  onClickOutside(node, callback)
}
