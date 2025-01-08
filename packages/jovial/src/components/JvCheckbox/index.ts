import { withInstall } from '@jovial/utils'
import _checkbox from './src/checkbox.vue'

const CheckBox = withInstall(_checkbox)

export * from './src/checkbox'

export default CheckBox

declare module 'vue' {
  export interface GlobalComponents {
    JvCheckBox: typeof CheckBox
  }
}
