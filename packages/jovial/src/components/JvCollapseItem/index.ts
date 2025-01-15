import { withInstall } from '@jovial/utils'
import _JvCollapseItem from './src/JvCollapseItem.vue'
import './style'

const JvCollapseItem = withInstall(_JvCollapseItem)
export * from './src/JvCollapseItem'
export default JvCollapseItem
export type JvCollapseItemInstance = InstanceType<typeof JvCollapseItem>
export type {
  JvCollapseItemEmits,
  JvCollapseItemExpose,
  JvCollapseItemProps,
  JvCollapseItemSlots,
} from './src/JvCollapseItem'
declare module 'vue' {
  export interface GlobalComponents {
    JvCollapseItem: typeof JvCollapseItem
  }
}
