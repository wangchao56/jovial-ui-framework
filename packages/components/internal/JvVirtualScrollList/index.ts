import { withInstall } from '@jienix/utils'
import _VirtualScrollList from './src/virtual-scroll-list.setup'

const VirtualScrollList = withInstall(_VirtualScrollList)
export * from './src/props'
export * from './src/virtual'
export * from './src/virtual-scroll-list'

export default VirtualScrollList
export type JvVirtualScrollListInstance = InstanceType<typeof VirtualScrollList>
export type {
  VirtualScrollListEmits,
  VirtualScrollListExpose,
  VirtualScrollListProps,
  VirtualScrollListSlots,
} from './src/virtual-scroll-list'
declare module 'vue' {
  export interface GlobalComponents {
    JvVirtualScrollList: typeof VirtualScrollList
  }
}
