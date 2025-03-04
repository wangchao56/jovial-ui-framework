import { withInstall } from '@jienix/utils'
import _JvTimeline from './src/JvTimeline.vue'
import './style'

const JvTimeline = withInstall(_JvTimeline)

export * from './src/JvTimeline'
export default JvTimeline
export type JvJvTimelineInstance = InstanceType<typeof JvTimeline>
export type {
  JvTimelineEmits,
  JvTimelineExpose,
  JvTimelineProps,
  JvTimelineSlots,
} from './src/JvTimeline'
declare module 'vue' {
  export interface GlobalComponents {
    JvTimeline: typeof JvTimeline
  }
}
