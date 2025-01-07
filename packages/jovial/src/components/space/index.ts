import _space from './src/space.vue'
import { withInstall } from '@jovial/utils'

const space = withInstall(_space)

export * from './src/space'

export default space

declare module 'vue' {
  export interface GlobalComponents {
    JvSpace: typeof space
  }
}
