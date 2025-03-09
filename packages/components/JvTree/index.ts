import { withInstall } from '@jienix/utils'
import _JvTree from './src/JvTree.vue'
import './style'

const JvTree = withInstall(_JvTree)

export * from './src/tree'
export default JvTree

declare module 'vue' {
  export interface GlobalComponents {
    JvTree: typeof JvTree
  }
}
