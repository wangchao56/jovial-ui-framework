import _Popover from './src/popover.vue'
import { withInstall } from '@jovial/utils'

const popover = withInstall(_Popover)

export * from './src/popover'
export default popover

declare module 'vue' {
  export interface GlobalComponents {
    JvPopover: typeof popover
  }
}
