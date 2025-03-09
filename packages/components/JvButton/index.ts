import { withInstall } from '@jienix/utils'
import _JvButton from './src/JvButton.vue'
import _JvButtonGroup from './src/JvButtonGroup.vue'
import './style'

const JvButton = withInstall(_JvButton)
const JvButtonGroup = withInstall(_JvButtonGroup)
export * from './src/JvButton'
export * from './src/JvButtonGroup'
export { JvButton, JvButtonGroup }
export type JvButtonInstance = InstanceType<typeof JvButton>

declare module 'vue' {
  export interface GlobalComponents {
    JvButton: typeof JvButton
    JvButtonGroup: typeof JvButtonGroup
  }
}
