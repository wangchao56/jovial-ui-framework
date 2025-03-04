import { withInstall } from '@jienix/utils'
import _JvTreeSelect from './src/JvTreeSelect.vue'
import './style'

const JvTreeSelect = withInstall(_JvTreeSelect)

export * from './src/JvTreeSelect'
export default JvTreeSelect
export type JvJvTreeSelectInstance = InstanceType<typeof JvTreeSelect>
export type {
  JvTreeSelectEmits,
  JvTreeSelectExpose,
  JvTreeSelectProps,
  JvTreeSelectSlots,
} from './src/JvTreeSelect'
declare module 'vue' {
  export interface GlobalComponents {
    JvTreeSelect: typeof JvTreeSelect
  }
}
