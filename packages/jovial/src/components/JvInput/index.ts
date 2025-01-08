import { withInstall } from '@jovial/utils'
import _input from './src/input.vue'

const input = withInstall(_input)

export * from './src/input'

export default input

declare module 'vue' {
  export interface GlobalComponents {
    JvInput: typeof input
  }
}
