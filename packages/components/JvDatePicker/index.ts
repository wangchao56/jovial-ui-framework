import { withInstall } from '@jienix/utils'
import _JvDatePicker from './src/JvDatePicker.vue'
import './style'

const JvDatePicker = withInstall(_JvDatePicker)

export * from './src/JvDatePicker'
export default JvDatePicker
export type JvJvDatePickerInstance = InstanceType<typeof JvDatePicker>
export type {
  JvDatePickerEmits,
  JvDatePickerExpose,
  JvDatePickerProps,
  JvDatePickerSlots,
} from './src/JvDatePicker'
declare module 'vue' {
  export interface GlobalComponents {
    JvDatePicker: typeof JvDatePicker
  }
}
