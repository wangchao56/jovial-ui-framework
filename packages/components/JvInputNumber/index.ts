import { withInstall } from '@jienix/utils'
import _JvInputNumber from './src/JvInputNumber.vue'
import './style'

const JvInputNumber = withInstall(_JvInputNumber)

export * from './src/JvInputNumber'
export default JvInputNumber
export type JvJvInputNumberInstance = InstanceType<typeof JvInputNumber>
export type {
  JvInputNumberEmits,
  JvInputNumberExpose,
  JvInputNumberProps,
  JvInputNumberSlots,
} from './src/JvInputNumber'
declare module 'vue' {
  export interface GlobalComponents {
    JvInputNumber: typeof JvInputNumber
  }
}
