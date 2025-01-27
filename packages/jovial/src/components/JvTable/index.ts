import { withInstall } from '@jovial/utils'
import _JvTable from './src/JvTable.vue'
import './style'

const JvTable = withInstall(_JvTable)

export * from './src/JvTable'
export default JvTable
export type JvJvTableInstance = InstanceType<typeof JvTable>
export type {
  JvTableEmits,
  JvTableExpose,
  JvTableProps,
  JvTableSlots,
} from './src/JvTable'
declare module 'vue' {
  export interface GlobalComponents {
    JvTable: typeof JvTable
  }
}
