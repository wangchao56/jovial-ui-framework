import _VirtualScrollList from './src/virtual-scroll-list.setup'
import { withInstall } from '@jovial/utils'
const VirtualScrollList = withInstall(_VirtualScrollList)
export * from './src/virtual-scroll-list'
export * from './src/virtual'
export * from './src/props'

export default VirtualScrollList
export type JvVirtualScrollListInstance = InstanceType<typeof VirtualScrollList>
export type {
  VirtualScrollListEmits,
  VirtualScrollListProps,
  VirtualScrollListExpose,
  VirtualScrollListSlots
} from './src/virtual-scroll-list'
declare module 'vue' {
  export interface GlobalComponents {
    JvVirtualScrollList: typeof VirtualScrollList
  }
}
