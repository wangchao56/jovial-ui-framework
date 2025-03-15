import { withInstall } from '@jienix/utils'
import _JvList from './src/JvList.vue'
import _JvListGroup from './src/JvListGroup.vue'
import _JvListItem from './src/JvListItem.vue'
import _JvListSubheader from './src/JvListSubheader.vue'
import './style'

const JvList = withInstall(_JvList)
const JvListItem = withInstall(_JvListItem)
const JvListGroup = withInstall(_JvListGroup)
const JvListSubheader = withInstall(_JvListSubheader)
export * from './src/JvList'
export * from './src/types'
export type JvJvListInstance = InstanceType<typeof JvList>
declare module 'vue' {
  export interface GlobalComponents {
    JvList: typeof JvList
    JvListItem: typeof JvListItem
    JvListGroup: typeof JvListGroup
    JvListSubheader: typeof JvListSubheader
  }
}

export { JvList, JvListGroup, JvListItem, JvListSubheader }
