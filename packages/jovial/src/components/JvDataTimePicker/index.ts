import { withInstall } from '@jovial/utils'
import _JvDataTimePicker from './src/JvDataTimePicker.vue'
import './style'

const JvDataTimePicker = withInstall(_JvDataTimePicker)

export * from './src/JvDataTimePicker'
export default JvDataTimePicker
export type JvJvDataTimePickerInstance = InstanceType<typeof JvDataTimePicker>
export type {
  JvDataTimePickerEmits,
  JvDataTimePickerExpose,
  JvDataTimePickerProps,
  JvDataTimePickerSlots,
} from './src/JvDataTimePicker'
declare module 'vue' {
  export interface GlobalComponents {
    JvDataTimePicker: typeof JvDataTimePicker
  }
}
