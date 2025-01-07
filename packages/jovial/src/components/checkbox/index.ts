import _checkbox from './src/checkbox.vue'
import { withInstall } from '@jovial/utils'

const CheckBox = withInstall(_checkbox)

export * from './src/checkbox'

export default CheckBox

declare module 'vue' {
  export interface GlobalComponents {
    JvCheckBox: typeof CheckBox
  }
}
