import { withInstall } from '@jienix/utils'
import _JvInfiniteScroll from './src/JvInfiniteScroll.vue'
import './style'

const JvInfiniteScroll = withInstall(_JvInfiniteScroll)

export * from './src/JvInfiniteScroll'
export default JvInfiniteScroll
export type JvJvInfiniteScrollInstance = InstanceType<typeof JvInfiniteScroll>

declare module 'vue' {
  export interface GlobalComponents {
    JvInfiniteScroll: typeof JvInfiniteScroll
  }
}
