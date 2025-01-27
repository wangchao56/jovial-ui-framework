import { withInstall } from '@jovial/utils'
import _JvMenu from './src/JvMenu.vue'
import './style/style.css'

const JvMenu = withInstall(_JvMenu)

export default JvMenu
export type JvMenuInstance = InstanceType<typeof JvMenu>

declare module 'vue' {
  export interface GlobalComponents {
    JvMenu: typeof JvMenu
  }
}

export { default as JvMenuDivider } from './src/components/JvMenuDivider'
export { default as JvMenuGroup } from './src/components/JvMenuGroup'
export { default as JvMenuItem } from './src/components/JvMenuItem'
export { default as JvSubMenu } from './src/components/JvSubMenu'

// 只从 types 导出类型定义
export * from './src/types'
