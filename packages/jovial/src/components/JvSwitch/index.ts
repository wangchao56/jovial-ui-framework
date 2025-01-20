import { withInstall } from '@jovial/utils'
import _JvSwitch from './src/JvSwitch.vue'
import './style'

const JvSwitch = withInstall(_JvSwitch)
export * from './src/JvSwitch'
export default JvSwitch
export type JvJvSwitchInstance = InstanceType<typeof JvSwitch>
export type {
  JvSwitchEmits,
  JvSwitchExpose,
  JvSwitchProps,
  JvSwitchSlots,
} from './src/JvSwitch'
declare module 'vue' {
  export interface GlobalComponents {
    JvSwitch: typeof JvSwitch
  }
}
