import { withInstall } from '@jovial/utils'
import _Editor from './src/editor.vue'

const editor = withInstall(_Editor)

export * from './src/editor'
export default editor

declare module 'vue' {
  export interface GlobalComponents {
    JvEditor: typeof editor
  }
}
