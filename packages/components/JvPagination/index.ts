import { withInstall } from '@jienix/utils'
import _JvPagination from './src/JvPagination.vue'

const JvPagination = withInstall(_JvPagination)

export * from './src/JvPagination'
export default JvPagination
export type JvJvPaginationInstance = InstanceType<typeof JvPagination>

declare module 'vue' {
  export interface GlobalComponents {
    JvPagination: typeof JvPagination
  }
}
