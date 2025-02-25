import { withInstall } from '@jovial/utils'
import _JvTabs from './src/JvTabs.vue'

const JvTabs = withInstall(_JvTabs)

export * from './src/JvTabs'

export default JvTabs

declare module 'vue' {
  export interface GlobalComponents {
    JvTabs: typeof JvTabs
  }
}
