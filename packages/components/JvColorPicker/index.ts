import { withInstall } from '@jienix/utils'
import _JvColorPicker from './src/JvColorPicker.vue'
import './style'

const JvColorPicker = withInstall(_JvColorPicker)

export * from './src/JvColorPicker'
export default JvColorPicker
export type JvJvColorPickerInstance = InstanceType<typeof JvColorPicker>
export type {
  JvColorPickerEmits,
  JvColorPickerExpose,
  JvColorPickerProps,
  JvColorPickerSlots,
} from './src/JvColorPicker'
declare module 'vue' {
  export interface GlobalComponents {
    JvColorPicker: typeof JvColorPicker
  }
}
