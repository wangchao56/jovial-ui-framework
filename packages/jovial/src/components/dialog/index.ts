import _Dialog from './src/dialog.vue'
import { withInstall } from '@jovial/utils'

const dialog = withInstall(_Dialog)

export * from './src/dialog'
export default dialog

declare module 'vue' {
  export interface GlobalComponents {
    JvDialog: typeof dialog
  }
}
