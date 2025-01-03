import _button from './src/button.vue'
import { withInstall } from '@jovial/utils'

const button = withInstall(_button)

export * from './src/button'

export default button
export type JvButtonInstance = InstanceType<typeof button>

declare module 'vue' {
  export interface GlobalComponents {
    JvButton: typeof button
  }
}
