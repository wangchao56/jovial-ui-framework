import JvAffix from './JvAffix'
import JvAlert from './JvAlert'
import JvAnchor from './JvAnchor'
import JvApp from './JvApp'
import JvAvatar from './JvAvatar'
import JvBackTop from './JvBackTop'
import JvBadge from './JvBadge'
import JvBreadcrumb from './JvBreadcrumb'
import { JvButton, JvButtonGroup } from './JvButton'
import JvCalendar from './JvCalendar'
import JvCard from './JvCard'
import JvCarousel from './JvCarousel'
import JvCascader from './JvCascader'
import JvCheckbox from './JvCheckbox'
import { JvCollapse, JvCollapseItem } from './JvCollapse'
import JvColorPicker from './JvColorPicker'
import JvDataTimePicker from './JvDataTimePicker'
import JvDatePicker from './JvDatePicker'
import JvDialog from './JvDialog'
import JvDivider from './JvDivider'
import JvDrawer from './JvDrawer'
import JvDropdown from './JvDropdown'
import JvEditor from './JvEditor'
import JvEllipsis from './JvEllipsis'
import JvEmpty from './JvEmpty'
import { JvForm, JvFormItem } from './JvForm'
import JvIcon from './JvIcon'
import JvImage from './JvImage'
import JvInfiniteScroll from './JvInfiniteScroll'
import JvInput from './JvInput'
import JvInputNumber from './JvInputNumber'
import JvList, { JvListGroup, JvListItem } from './JvList'
import JvLoading from './JvLoading'
import JvMenu from './JvMenu'
import JvMessage from './JvMessage'
import JvNotification from './JvNotification'
import JvOverlay from './JvOverlay'
import JvPagination from './JvPagination'
import JvProgress from './JvProgress'
import { JvRadio, JvRadioGroup } from './JvRadio'
import JvRate from './JvRate'
import JvResult from './JvResult'
import JvScrollBar from './JvScrollBar'
import JvSelect from './JvSelect'
import JvSkeleton from './JvSkeleton'
import JvSlider from './JvSlider'
import JvSpace from './JvSpace'
import JvSplit from './JvSplit'
import JvSteps from './JvSteps'
import JvSwitch from './JvSwitch'
import JvTable from './JvTable'
import JvTabs from './JvTabs'
import JvTag from './JvTag'
import JvTextarea from './JvTextarea'
import JvTimeline from './JvTimeline'
import JvTimePicker from './JvTimePicker'
import JvTooltip from './JvTooltip'
import JvTransfer from './JvTransfer'
import JvTree from './JvTree'
import JvTreeSelect from './JvTreeSelect'
import JvUpload from './JvUpload'
import JvVideo from './JvVideo'
import JvVirtualScroll from './JvVirtualScroll'
import { JvCol, JvColSpace, JvRow } from './Layout'
import {
  JvAside,
  JvContainer,
  JvFooter,
  JvHeader,
  JvMain,
} from './PageContainer'
import { JvCode, JvLink, JvParagraph, JvText, JvTitle } from './Typography'
// 将组件按类别分组导出
const components = {
  // 通用组件
  COMMON_COMPONENT: {
    JvButton,
    JvButtonGroup,
    JvIcon,
    JvDivider,
    // Typography
    JvTitle,
    JvText,
    JvLink,
    JvParagraph,
    JvEllipsis,
  },

  // 数据录入组件
  DATA_INPUT_COMPONENT: {
    JvForm,
    JvFormItem,
    JvInput,
    JvInputNumber,
    JvTextarea,
    JvRadio,
    JvRadioGroup,
    JvCheckbox,
    JvSwitch,
    JvRate,
    JvSelect,
    JvDatePicker,
    JvTimePicker,
    JvColorPicker,
    JvUpload,
    JvTransfer,
    JvTree,
    JvCascader,
    JvTreeSelect,
    JvSlider,
    JvEditor,
    JvDataTimePicker,
  },

  // 数据展示组件
  DATA_DISPLAY_COMPONENT: {
    JvTable,
    // JvTableColumn,
    JvList,
    JvListItem,
    JvListGroup,
    JvTree,
    JvCard,
    JvTag,
    JvTimeline,
    JvProgress,
    JvAvatar,
    JvImage,
    JvVideo,
    JvCarousel,
    JvCalendar,
    JvCollapse,
    JvCollapseItem,
    JvCode,
  },

  // 布局组件
  LAYOUT_COMPONENT: {
    JvContainer,
    JvRow,
    JvCol,
    JvColSpace,
    JvSplit,
    JvSpace,
    JvAside,
    JvHeader,
    JvMain,
    JvFooter,
  },

  // 反馈组件
  FEEDBACK_COMPONENT: {
    JvAlert,
    JvMessage,
    JvNotification,
    JvOverlay,
    JvDrawer,
    JvDialog,
    JvTooltip,
    JvLoading,
    JvSkeleton,
    JvResult,
    JvEmpty,
    JvBadge,
  },

  // 导航组件
  NAVIGATION_COMPONENT: {
    JvAffix,
    JvMenu,
    JvBreadcrumb,
    JvDropdown,
    JvPagination,
    JvSteps,
    JvAnchor,
    JvBackTop,
    JvTabs,
  },

  // 配置组件
  CONFIG_COMPONENT: {
    JvApp,
  },

  // 其他组件
  OTHER_COMPONENT: {
    JvVirtualScroll,
    JvScrollBar,
    JvInfiniteScroll,
  },
} as const

// 导出所有组件的扁平数组(保持向后兼容)
export default Object.values(components).flatMap(group =>
  Object.values(group),
)

// 导出分组后的组件对象
export { components }
