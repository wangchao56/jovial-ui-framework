import { withInstall } from '@jovial/utils'
import _button from './src/button.vue'
import _buttonGroup from './src/JvButtonGroup.setup.vue'
import './style'

const JvButton = withInstall(_button)
const JvButtonGroup = withInstall(_buttonGroup)
export * from './src/button'
export * from './src/buttonGroup'
export {
  JvButton,
  JvButtonGroup,
}
export type JvButtonInstance = InstanceType<typeof JvButton>

declare module 'vue' {
  export interface GlobalComponents {
    JvButton: typeof JvButton
    JvButtonGroup: typeof JvButtonGroup
  }
}
