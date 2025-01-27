import { withInstall } from '@jovial/utils'
import _JvRadio from './src/JvRadio.vue'
import _JvRadioGroup from './src/JvRadioGroup.vue'
import './style'

const JvRadio = withInstall(_JvRadio)
const JvRadioGroup = withInstall(_JvRadioGroup)

export * from './src/JvRadio'
export { JvRadio, JvRadioGroup }
export type JvRadioInstance = InstanceType<typeof JvRadio>
export type JvRadioGroupInstance = InstanceType<typeof JvRadioGroup>
export * from './src/JvRadioGroup'

declare module 'vue' {
  export interface GlobalComponents {
    JvRadio: typeof JvRadio
    JvRadioGroup: typeof JvRadioGroup
  }
}
