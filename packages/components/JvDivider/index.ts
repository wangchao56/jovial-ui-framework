import { withInstall } from '@jienix/utils'
import _JvDivider from './src/JvDivider.vue'
import './style'

const JvDivider = withInstall(_JvDivider)

export * from './src/JvDivider'
export default JvDivider
export type JvJvDividerInstance = InstanceType<typeof JvDivider>
export type {
  JvDividerEmits,
  JvDividerExpose,
  JvDividerProps,
  JvDividerSlots,
} from './src/JvDivider'
declare module 'vue' {
  export interface GlobalComponents {
    JvDivider: typeof JvDivider
  }
}
