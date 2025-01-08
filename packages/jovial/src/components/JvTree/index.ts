import { withInstall } from '@jovial/utils'
/**
 * tree 组件的设计规范
 */
import _tree from './src/tree.vue'

const Tree = withInstall(_tree)

export * from './src/tree'
export default Tree

declare module 'vue' {
  export interface GlobalComponents {
    JvTree: typeof Tree
  }
}
