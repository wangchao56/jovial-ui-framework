import { withInstall } from '@jovial/utils'
import _JvInfiniteScroll from './src/JvInfiniteScroll.vue'
import './style'

const JvInfiniteScroll = withInstall(_JvInfiniteScroll)

export * from './src/JvInfiniteScroll'
export default JvInfiniteScroll
export type JvJvInfiniteScrollInstance = InstanceType<typeof JvInfiniteScroll>
export type {
  JvInfiniteScrollEmits,
  JvInfiniteScrollExpose,
  JvInfiniteScrollProps,
  JvInfiniteScrollSlots,
} from './src/JvInfiniteScroll'
declare module 'vue' {
  export interface GlobalComponents {
    JvInfiniteScroll: typeof JvInfiniteScroll
  }
}
