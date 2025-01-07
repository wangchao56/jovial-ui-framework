/**
 * _virtualScroll 组件的设计规范
 */
import _virtualScroll from './src/virtual-scroll'
import { withInstall } from '@jovial/utils'

const VirtualScroll = withInstall(_virtualScroll)

export * from './src/virtual'

export default VirtualScroll

declare module 'vue' {
  export interface GlobalComponents {
    JvVirtualScroll: typeof VirtualScroll
  }
}
