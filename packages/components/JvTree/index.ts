import { withInstall } from '@jienix/utils'
/**
 * tree 组件的设计规范
 */
import _JvTree from './src/JvTree.vue'

const JvTree = withInstall(_JvTree)

export * from './src/tree'
export default JvTree

declare module 'vue' {
  export interface GlobalComponents {
    JvTree: typeof JvTree
  }
}
