import { withInstall } from '@jienix/utils'
import _JvProgress from './src/JvProgress.vue'
import './style'

const JvProgress = withInstall(_JvProgress)

export * from './src/JvProgress'
export default JvProgress
export type JvJvProgressInstance = InstanceType<typeof JvProgress>
export type {
  JvProgressEmits,
  JvProgressExpose,
  JvProgressProps,
  JvProgressSlots,
} from './src/JvProgress'
declare module 'vue' {
  export interface GlobalComponents {
    JvProgress: typeof JvProgress
  }
}
