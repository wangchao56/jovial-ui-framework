import { withInstall } from '@jovial/utils'
import _space from './src/space.vue'

const space = withInstall(_space)

export * from './src/space'

export default space

declare module 'vue' {
  export interface GlobalComponents {
    JvSpace: typeof space
  }
}
