import { withInstall } from '@jovial/utils'
import _JvList from './src/JvList.setup'
import './style'

const JvList = withInstall(_JvList)

export * from './src/JvList'
export default JvList
export type JvJvListInstance = InstanceType<typeof JvList>
export type {
  JvListEmits,
  JvListExpose,
  JvListProps,
  JvListSlots,
} from './src/JvList'
declare module 'vue' {
  export interface GlobalComponents {
    JvList: typeof JvList
  }
}
