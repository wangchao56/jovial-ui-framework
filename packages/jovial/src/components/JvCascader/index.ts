import { withInstall } from '@jovial/utils'
import _JvCascader from './src/JvCascader.vue'
import './style'

const JvCascader = withInstall(_JvCascader)

export * from './src/JvCascader'
export default JvCascader
export type JvJvCascaderInstance = InstanceType<typeof JvCascader>
export type {
  JvCascaderEmits,
  JvCascaderExpose,
  JvCascaderProps,
  JvCascaderSlots,
} from './src/JvCascader'
declare module 'vue' {
  export interface GlobalComponents {
    JvCascader: typeof JvCascader
  }
}
