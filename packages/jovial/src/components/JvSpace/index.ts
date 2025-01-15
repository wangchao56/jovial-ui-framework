import { withInstall } from '@jovial/utils'
import _space from './src/space.vue'
import './src/jv-space.css'

const JvSpace = withInstall(_space)

export * from './src/space'

export default JvSpace

declare module 'vue' {
  export interface GlobalComponents {
    JvSpace: typeof JvSpace
  }
}
