import { withInstall } from '@jienix/utils'
import _JvBackTop from './src/JvBackTop.vue'
import './style'

const JvBackTop = withInstall(_JvBackTop)

export * from './src/JvBackTop'
export default JvBackTop
export type JvJvBackTopInstance = InstanceType<typeof JvBackTop>
export type {
  JvBackTopEmits,
  JvBackTopExpose,
  JvBackTopProps,
  JvBackTopSlots,
} from './src/JvBackTop'
declare module 'vue' {
  export interface GlobalComponents {
    JvBackTop: typeof JvBackTop
  }
}
