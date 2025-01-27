import { withInstall } from '@jovial/utils'
import _JvTransfer from './src/JvTransfer.vue'
import './style'

const JvTransfer = withInstall(_JvTransfer)

export * from './src/JvTransfer'
export default JvTransfer
export type JvJvTransferInstance = InstanceType<typeof JvTransfer>
export type {
  JvTransferEmits,
  JvTransferExpose,
  JvTransferProps,
  JvTransferSlots,
} from './src/JvTransfer'
declare module 'vue' {
  export interface GlobalComponents {
    JvTransfer: typeof JvTransfer
  }
}
