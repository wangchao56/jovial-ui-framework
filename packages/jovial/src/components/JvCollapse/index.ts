import { withInstall } from '@jovial/utils'
import _JvCollapse from './src/JvCollapse.vue'
import './style'

const JvCollapse = withInstall(_JvCollapse)
export * from './src/JvCollapse'
export default JvCollapse
export type JvJvCollapseInstance = InstanceType<typeof JvCollapse>
export type {
  JvCollapseEmits,
  JvCollapseExpose,
  JvCollapseProps,
  JvCollapseSlots,
} from './src/JvCollapse'
declare module 'vue' {
  export interface GlobalComponents {
    JvCollapse: typeof JvCollapse
  }
}
