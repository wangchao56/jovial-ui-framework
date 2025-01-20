import { withInstall } from '@jovial/utils'
import _JvOverlay from './src/JvOverlay.vue'
import './style'

const JvOverlay = withInstall(_JvOverlay)

export * from './src/JvOverlay'
export default JvOverlay
export type JvJvOverlayInstance = InstanceType<typeof JvOverlay>
export type {
  JvOverlayEmits,
  JvOverlayExpose,
  JvOverlayProps,
  JvOverlaySlots,
} from './src/JvOverlay'
declare module 'vue' {
  export interface GlobalComponents {
    JvOverlay: typeof JvOverlay
  }
}
