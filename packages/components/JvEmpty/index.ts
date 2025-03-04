import { withInstall } from '@jienix/utils'
import _JvEmpty from './src/JvEmpty.vue'
import './style'

const JvEmpty = withInstall(_JvEmpty)

export * from './src/JvEmpty'
export default JvEmpty
export type JvJvEmptyInstance = InstanceType<typeof JvEmpty>
export type {
  JvEmptyEmits,
  JvEmptyExpose,
  JvEmptyProps,
  JvEmptySlots,
} from './src/JvEmpty'
declare module 'vue' {
  export interface GlobalComponents {
    JvEmpty: typeof JvEmpty
  }
}
