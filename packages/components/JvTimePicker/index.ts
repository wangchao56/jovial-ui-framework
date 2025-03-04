import { withInstall } from '@jienix/utils'
import _JvTimePicker from './src/JvTimePicker.vue'
import './style'

const JvTimePicker = withInstall(_JvTimePicker)

export * from './src/JvTimePicker'
export default JvTimePicker
export type JvJvTimePickerInstance = InstanceType<typeof JvTimePicker>
export type {
  JvTimePickerEmits,
  JvTimePickerExpose,
  JvTimePickerProps,
  JvTimePickerSlots,
} from './src/JvTimePicker'
declare module 'vue' {
  export interface GlobalComponents {
    JvTimePicker: typeof JvTimePicker
  }
}
