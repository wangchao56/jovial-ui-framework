import { withInstall } from '@jienix/utils'
import _JvTabPanel from './src/JvTabPanel.vue'
import _JvTabs from './src/JvTabs.vue'
import './style'

const JvTabs = withInstall(_JvTabs)
const JvTabPanel = withInstall(_JvTabPanel)
export * from './src/JvTabs'

export { JvTabPanel, JvTabs }

declare module 'vue' {
  export interface GlobalComponents {
    JvTabs: typeof JvTabs
    JvTabPanel: typeof JvTabPanel
  }
}
