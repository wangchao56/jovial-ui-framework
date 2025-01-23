import { withInstall } from '@jovial/utils'
import _JvMenu from './src/JvMenu.vue'
import './style/style.css'

const JvMenu = withInstall(_JvMenu)

export * from './src/JvMenu'
export default JvMenu
export type JvMenuInstance = InstanceType<typeof JvMenu>
declare module 'vue' {
  export interface GlobalComponents {
    JvMenu: typeof JvMenu
  }
}
