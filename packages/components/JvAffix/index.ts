import { withInstall } from '@jienix/utils'
import _JvAffix from './src/JvAffix.vue'
import './style'

const JvAffix = withInstall(_JvAffix)

export * from './src/JvAffix'
export type JvJvAffixInstance = InstanceType<typeof JvAffix>
export type {
  JvAffixEmits,
  JvAffixExpose,
  JvAffixProps,
  JvAffixSlots,
} from './src/JvAffix'
declare module 'vue' {
  export interface GlobalComponents {
    JvAffix: typeof JvAffix
  }
}
export default JvAffix
