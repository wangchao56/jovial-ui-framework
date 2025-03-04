import { withInstall } from '@jienix/utils'
import _JvSelect from './src/JvSelect.vue'
import './style'

const JvSelect = withInstall(_JvSelect)

export * from './src/JvSelect'
export default JvSelect
export type JvJvSelectInstance = InstanceType<typeof JvSelect>
export type {
  JvSelectEmits,
  JvSelectExpose,
  JvSelectProps,
  JvSelectSlots,
} from './src/JvSelect'
declare module 'vue' {
  export interface GlobalComponents {
    JvSelect: typeof JvSelect
  }
}
