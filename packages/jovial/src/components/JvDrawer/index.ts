import { withInstall } from '@jovial/utils'
import _JvDrawer from './src/JvDrawer.vue'
import './style'

const JvDrawer = withInstall(_JvDrawer)

export * from './src/JvDrawer'
export default JvDrawer
export type JvJvDrawerInstance = InstanceType<typeof JvDrawer>
export type {
  JvDrawerEmits,
  JvDrawerExpose,
  JvDrawerProps,
  JvDrawerSlots,
} from './src/JvDrawer'
declare module 'vue' {
  export interface GlobalComponents {
    JvDrawer: typeof JvDrawer
  }
}
