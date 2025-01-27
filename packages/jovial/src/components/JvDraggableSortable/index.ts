import { withInstall } from '@jovial/utils'
import _JvDraggableSortable from './src/JvDraggableSortable.vue'
import './style'

const JvDraggableSortable = withInstall(_JvDraggableSortable)

export * from './src/JvDraggableSortable'
export default JvDraggableSortable
export type JvJvDraggableSortableInstance = InstanceType<typeof JvDraggableSortable>
export type {
  JvDraggableSortableEmits,
  JvDraggableSortableExpose,
  JvDraggableSortableProps,
  JvDraggableSortableSlots,
} from './src/JvDraggableSortable'
declare module 'vue' {
  export interface GlobalComponents {
    JvDraggableSortable: typeof JvDraggableSortable
  }
}
