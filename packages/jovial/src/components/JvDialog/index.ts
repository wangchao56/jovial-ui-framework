import { withInstall } from '@jovial/utils'
import _Dialog from './src/JvDialog.vue'

const JvDialog = withInstall(_Dialog)

export * from './src/JvDialog'
export default JvDialog

declare module 'vue' {
  export interface GlobalComponents {
    JvDialog: typeof JvDialog
  }
}
