import _button from './src/button.vue'
import { withInstall } from '@jovial/utils'
export * from './src/button'

const button = withInstall(_button)

export default button
export type JvButtonInstance = InstanceType<typeof button>

declare module 'vue' {
  export interface GlobalComponents {
    JvButton: typeof button
  }
}
