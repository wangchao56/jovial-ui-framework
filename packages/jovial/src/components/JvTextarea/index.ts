import { withInstall } from '@jovial/utils'
import _JvTextarea from './src/JvTextarea.vue'
import './style'

const JvTextarea = withInstall(_JvTextarea)

export * from './src/JvTextarea'
export default JvTextarea
export type JvJvTextareaInstance = InstanceType<typeof JvTextarea>
export type {
  JvTextareaEmits,
  JvTextareaExpose,
  JvTextareaProps,
  JvTextareaSlots,
} from './src/JvTextarea'
declare module 'vue' {
  export interface GlobalComponents {
    JvTextarea: typeof JvTextarea
  }
}
