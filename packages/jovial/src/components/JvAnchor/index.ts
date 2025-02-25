import { withInstall } from '@jovial/utils'
import _JvAnchor from './src/JvAnchor.vue'
import './style'

const JvAnchor = withInstall(_JvAnchor)

export * from './src/JvAnchor'
export default JvAnchor
export type JvJvAnchorInstance = InstanceType<typeof JvAnchor>
export type {
  JvAnchorEmits,
  JvAnchorExpose,
  JvAnchorProps,
  JvAnchorSlots,
} from './src/JvAnchor'
declare module 'vue' {
  export interface GlobalComponents {
    JvAnchor: typeof JvAnchor
  }
}
