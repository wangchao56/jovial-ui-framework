import { withInstall } from '@jienix/utils'
import _breadcrumb from './src/JvBreadcrumb.vue'
import './style'

export * from './src/JvBreadcrumb'

const JvBreadcrumb = withInstall(_breadcrumb)

export default JvBreadcrumb
export type JvButtonInstance = InstanceType<typeof JvBreadcrumb>

declare module 'vue' {
  export interface GlobalComponents {
    JvBreadcrumb: typeof JvBreadcrumb
  }
}
