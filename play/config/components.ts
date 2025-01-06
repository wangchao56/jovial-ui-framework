import JvIcon from '@jovial/components/icon/index'
import JvTree from '@jovial/components/tree'
import JvCheckbox from '@jovial/components/checkbox'
import JvInput from '@jovial/components/input'
import JvUpload from '@jovial/components/upload'
import JvButton from '@jovial/components/button'
import JvCalendar from '@jovial/components/calendar'
import { JvForm, JvFormItem } from '@jovial/components/form'
import { JvBarChart, JvLineChart, JvPieChart } from '@jovial/components/chart'
import JvVirtualScrollList from '@jovial/components/virtual-scroll-list'

import '@jovial/theme-chalk/src/index.scss'
const plugins = [
  JvIcon,
  JvTree,
  JvCheckbox,
  JvInput,
  JvButton,
  JvUpload,
  JvFormItem,
  JvForm,
  JvBarChart,
  JvLineChart,
  JvPieChart,
  JvCalendar,
  JvVirtualScrollList
]

export { plugins }
