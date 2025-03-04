import { withInstall } from '@jienix/utils'
import _JvGrid from './src/JvGrid.vue'
import './style'

const JvGrid = withInstall(_JvGrid)

export * from './src/JvGrid'
export default JvGrid
export type JvJvGridInstance = InstanceType<typeof JvGrid>
export type {
  JvGridEmits,
  JvGridExpose,
  JvGridProps,
  JvGridSlots,
} from './src/JvGrid'
declare module 'vue' {
  export interface GlobalComponents {
    JvGrid: typeof JvGrid
  }
}
