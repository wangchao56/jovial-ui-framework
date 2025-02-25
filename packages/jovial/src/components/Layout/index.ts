import { withInstall } from '@jovial/utils'
import _JvCol from './src/JvCol.vue'
import _JvColSpace from './src/JvColSpace.vue'
import _JvRow from './src/JvRow.vue'
import './style'

const JvRow = withInstall(_JvRow)
const JvCol = withInstall(_JvCol)
const JvColSpace = withInstall(_JvColSpace)
export {
  JvCol,
  JvColSpace,
  JvRow,
}

export type JvJvRowInstance = InstanceType<typeof JvRow>
export type JvJvColInstance = InstanceType<typeof JvCol>

export type * from './src/type'

declare module 'vue' {
  export interface GlobalComponents {
    JvRow: typeof JvRow
    JvCol: typeof JvCol
    JvColSpace: typeof JvColSpace
  }
}
