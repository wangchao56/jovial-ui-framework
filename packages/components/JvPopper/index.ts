import { withInstall } from '@jienix/utils'
import _JvPopper from './src/JvPopper.vue'
import './style'

const JvPopper = withInstall(_JvPopper)

export * from './src/JvPopper'
export default JvPopper
export type JvPopperInstance = InstanceType<typeof JvPopper>

declare module 'vue' {
  export interface GlobalComponents {
    JvPopper: typeof JvPopper
  }
}
