import { withInstall } from '@jienix/utils'
import _JvVideo from './src/JvVideo.vue'
import './style'

const JvVideo = withInstall(_JvVideo)

export * from './src/JvVideo'
export default JvVideo
export type JvJvVideoInstance = InstanceType<typeof JvVideo>
export type {
  JvVideoEmits,
  JvVideoExpose,
  JvVideoProps,
  JvVideoSlots,
} from './src/JvVideo'
declare module 'vue' {
  export interface GlobalComponents {
    JvVideo: typeof JvVideo
  }
}
