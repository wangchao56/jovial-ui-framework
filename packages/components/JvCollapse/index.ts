import { withInstall } from '@jienix/utils'
import _JvCollapse from './src/JvCollapse.vue'
import _JvCollapseItem from './src/JvCollapseItem.vue'
import './style'

const JvCollapse = withInstall(_JvCollapse)
const JvCollapseItem = withInstall(_JvCollapseItem)
export { JvCollapse, JvCollapseItem }
export * from './src/JvCollapse'
export * from './src/JvCollapseItem'
export type JvCollapseItemInstance = InstanceType<typeof JvCollapseItem>
export type JvJvCollapseInstance = InstanceType<typeof JvCollapse>
declare module 'vue' {
  export interface GlobalComponents {
    JvCollapse: typeof JvCollapse
    JvCollapseItem: typeof JvCollapseItem
  }
}
