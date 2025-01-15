import { withInstall } from '@jovial/utils'
import _JvDropdown from './src/JvDropdown.vue'

const JvDropdown = withInstall(_JvDropdown)
export * from './src/JvDropdown'
export default JvDropdown
export type JvJvDropdownInstance = InstanceType<typeof JvDropdown>
export type {
  JvDropdownEmits,
  JvDropdownExpose,
  JvDropdownProps,
  JvDropdownSlots,
} from './src/JvDropdown'
declare module 'vue' {
  export interface GlobalComponents {
    JvDropdown: typeof JvDropdown
  }
}
