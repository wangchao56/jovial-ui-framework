import { withInstall } from '@jovial/utils'
import _JvScrollBar from './src/JvScrollBar.vue'
import './style'

const JvScrollBar = withInstall(_JvScrollBar)

export * from './src/JvScrollBar'
export default JvScrollBar
export type JvJvScrollBarInstance = InstanceType<typeof JvScrollBar>
export type {
  JvScrollBarEmits,
  JvScrollBarExpose,
  JvScrollBarProps,
  JvScrollBarSlots,
} from './src/JvScrollBar'
declare module 'vue' {
  export interface GlobalComponents {
    JvScrollBar: typeof JvScrollBar
  }
}
