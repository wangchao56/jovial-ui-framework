import _Popper from './src/popper.setup'
import { withInstall } from '@jovial/utils'

const JvPopper = withInstall(_Popper)

export * from './src/popper'
export default JvPopper
export type JvPopperInstance = InstanceType<typeof JvPopper>

declare module 'vue' {
  export interface GlobalComponents {
    JvPopper: typeof JvPopper
  }
}
