import { withInstall } from '@jienix/utils'
import _JvLoading from './src/JvLoading.vue'
import './style'

const JvLoading = withInstall(_JvLoading)

export * from './src/JvLoading'
export default JvLoading
export type JvJvLoadingInstance = InstanceType<typeof JvLoading>
export type {
  JvLoadingEmits,
  JvLoadingExpose,
  JvLoadingProps,
  JvLoadingSlots,
} from './src/JvLoading'
declare module 'vue' {
  export interface GlobalComponents {
    JvLoading: typeof JvLoading
  }
}
