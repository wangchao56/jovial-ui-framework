import { withInstall } from '@jovial/utils'
import _JvSlider from './src/JvSlider.vue'
import './style'

const JvSlider = withInstall(_JvSlider)

export * from './src/JvSlider'
export default JvSlider
export type JvJvSliderInstance = InstanceType<typeof JvSlider>
export type {
  JvSliderEmits,
  JvSliderExpose,
  JvSliderProps,
  JvSliderSlots,
} from './src/JvSlider'
declare module 'vue' {
  export interface GlobalComponents {
    JvSlider: typeof JvSlider
  }
}
