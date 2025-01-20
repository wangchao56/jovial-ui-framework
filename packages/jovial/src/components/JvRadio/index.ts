import { withInstall } from '@jovial/utils'
import _JvRadio from './src/JvRadio.vue'
import './style'

const JvRadio = withInstall(_JvRadio)

export * from './src/JvRadio'
export default JvRadio
export type JvJvRadioInstance = InstanceType<typeof JvRadio>
export type {
  JvRadioEmits,
  JvRadioExpose,
  JvRadioProps,
  JvRadioSlots,
} from './src/JvRadio'
declare module 'vue' {
  export interface GlobalComponents {
    JvRadio: typeof JvRadio
  }
}
