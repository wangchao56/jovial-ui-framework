import { withInstall } from '@jovial/utils'
import _Editor from './src/JvEditor.vue'

const JvEditor = withInstall(_Editor)

export * from './src/JvEditor'
export default JvEditor

declare module 'vue' {
  export interface GlobalComponents {
    JvEditor: typeof JvEditor
  }
}
