import { withInstall } from '@jovial/utils'
import _button from './src/button.vue'

export * from './src/button'

const button = withInstall(_button)

export default button
export type JvButtonInstance = InstanceType<typeof button>

declare module 'vue' {
  export interface GlobalComponents {
    JvButton: typeof button
  }
}
