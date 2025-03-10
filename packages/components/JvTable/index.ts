import { withInstall } from '@jienix/utils'
import _JvTable from './src/JvTable.vue'
import _JvTableColumn from './src/JvTableColumn.vue'
import _JvTableFooter from './src/JvTableFooter.vue'
import _JvTableHeader from './src/JvTableHeader.vue'

import './style'

const JvTable = withInstall(_JvTable)
const JvTableColumn = withInstall(_JvTableColumn)
const JvTableHeader = withInstall(_JvTableHeader)
const JvTableFooter = withInstall(_JvTableFooter)
export { JvTable, JvTableColumn, JvTableFooter, JvTableHeader }
export * from './src/JvTable'
export default JvTable
export type JvJvTableInstance = InstanceType<typeof JvTable>
declare module 'vue' {
  export interface GlobalComponents {
    JvTable: typeof JvTable
  }
}
