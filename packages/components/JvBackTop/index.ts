import { withInstall } from '@jienix/utils'
import _JvBacktop from './src/JvBacktop.vue'
import './style'

const JvBacktop = withInstall(_JvBacktop)

export * from './src/JvBacktop'
export default JvBacktop
export type JvJvBacktopInstance = InstanceType<typeof JvBacktop>
export type {
  JvBacktopEmits,
  JvBacktopExpose,
  JvBacktopProps,
  JvBacktopSlots,
} from './src/JvBacktop'
declare module 'vue' {
  export interface GlobalComponents {
    JvBacktop: typeof JvBacktop
  }
}
