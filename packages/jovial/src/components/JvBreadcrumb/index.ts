import { withInstall } from '@jovial/utils'
import _breadcrumb from './src/breadcrumb.vue'

export * from './src/breadcrumb'

const JvBreadcrumb = withInstall(_breadcrumb)

export default JvBreadcrumb
export type JvButtonInstance = InstanceType<typeof JvBreadcrumb>

declare module 'vue' {
  export interface GlobalComponents {
    JvBreadcrumb: typeof JvBreadcrumb
  }
}
