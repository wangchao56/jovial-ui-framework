import { withInstall } from '@jienix/utils'
import _JvResult from './src/JvResult.vue'
import './style'

const JvResult = withInstall(_JvResult)

export * from './src/JvResult'
export default JvResult
export type JvJvResultInstance = InstanceType<typeof JvResult>
export type {
  JvResultEmits,
  JvResultExpose,
  JvResultProps,
  JvResultSlots,
} from './src/JvResult'
declare module 'vue' {
  export interface GlobalComponents {
    JvResult: typeof JvResult
  }
}
