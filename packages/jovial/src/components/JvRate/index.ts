import { withInstall } from '@jovial/utils'
import _JvRate from './src/JvRate.vue'
import './style'

const JvRate = withInstall(_JvRate)

export * from './src/JvRate'
export default JvRate
export type JvJvRateInstance = InstanceType<typeof JvRate>
export type {
  JvRateEmits,
  JvRateExpose,
  JvRateProps,
  JvRateSlots,
} from './src/JvRate'
declare module 'vue' {
  export interface GlobalComponents {
    JvRate: typeof JvRate
  }
}
