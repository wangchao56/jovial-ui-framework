import { withInstall } from '@jovial/utils'
import _button from './src/JvButton.vue'
import _buttonGroup from './src/JvButtonGroup.setup.vue'
import './style'

const JvButton = withInstall(_button)
const JvButtonGroup = withInstall(_buttonGroup)
export * from './src/JvButton'
export * from './src/JvButtonGroup'
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
