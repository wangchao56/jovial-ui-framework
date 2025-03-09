import { withInstall } from '@jienix/utils'
import _JvList from './src/JvList.setup'
import _JvListGroup from './src/JvListGroup.setup'
import _JvListItem from './src/JvListItem.setup'
import './style'

const JvList = withInstall(_JvList)
const JvListItem = withInstall(_JvListItem)
const JvListGroup = withInstall(_JvListGroup)
export * from './src/JvList'
export * from './src/types'
export type JvJvListInstance = InstanceType<typeof JvList>
declare module 'vue' {
  export interface GlobalComponents {
    JvList: typeof JvList
    JvListItem: typeof JvListItem
    JvListGroup: typeof JvListGroup
  }
}

export { JvList, JvListGroup, JvListItem }
