import { withInstall } from '@jienix/utils'
import _JvSplit from './src/JvSplit.vue'
import './style'

const JvSplit = withInstall(_JvSplit)

export * from './src/JvSplit'
export default JvSplit
export type JvJvSplitInstance = InstanceType<typeof JvSplit>
export type {
  JvSplitEmits,
  JvSplitExpose,
  JvSplitProps,
  JvSplitSlots,
} from './src/JvSplit'
declare module 'vue' {
  export interface GlobalComponents {
    JvSplit: typeof JvSplit
  }
}
