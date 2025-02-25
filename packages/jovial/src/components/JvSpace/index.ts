import { withInstall } from '@jovial/utils'
import _JvSpace from './src/JvSpace.vue'
import './style/jv-space.css'

const JvSpace = withInstall(_JvSpace)

export * from './src/JvSpace'

export default JvSpace

declare module 'vue' {
  export interface GlobalComponents {
    JvSpace: typeof JvSpace
  }
}
