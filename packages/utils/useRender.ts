// Types
import type { VNode } from 'vue'
// Utilities
import { getCurrentInstance } from './getCurrentInstance'

export function useRender(render: () => VNode): void {
  const vm = getCurrentInstance('useRender') as any
  vm.render = render
}
