import _Editor from './src/editor.vue'
import { withInstall } from '@jovial/utils'

const editor = withInstall(_Editor)

export * from './src/editor'
export default editor

declare module 'vue' {
  export interface GlobalComponents {
    JvEditor: typeof editor
  }
}
