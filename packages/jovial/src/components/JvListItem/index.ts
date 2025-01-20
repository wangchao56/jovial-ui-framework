import { withInstall } from '@jovial/utils'
import _JvListItem from './src/JvListItem.setup'
import './style'

const JvListItem = withInstall(_JvListItem)

export * from './src/JvListItem'
export default JvListItem
export type JvJvListItemInstance = InstanceType<typeof JvListItem>
export type {
  JvListItemEmits,
  JvListItemExpose,
  JvListItemProps,
  JvListItemSlots,
} from './src/JvListItem'
declare module 'vue' {
  export interface GlobalComponents {
    JvListItem: typeof JvListItem
  }
}
