import { withInstall } from '@jienix/utils'
import _JvPopover from './src/JvPopover.vue'
import './style'

const JvPopover = withInstall(_JvPopover)

export * from './src/JvPopover'
export default JvPopover

declare module 'vue' {
  export interface GlobalComponents {
    JvPopover: typeof JvPopover
  }
}
