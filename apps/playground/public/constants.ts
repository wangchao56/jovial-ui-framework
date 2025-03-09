import Mock from 'mockjs'

const virtualDataTemplate = {
  'list|1000': [
    {
      'id': '@increment',
      'name': '@cname',
      'children|1-3': [
        {
          id: '@increment',
          name: '@cname',
        },
      ],
    },
  ],
}

const virtualListTemplate = {
  'list|1000': [
    {
      id: '@increment',
      name: `@cparagraph(3)`,
    },
  ],
}

export const virtualDataTemp = Mock.mock(virtualDataTemplate)

export const virtualListTemp = Mock.mock(virtualListTemplate)
// // 将组件按类别分组导出
// const components_class = {
//   // 通用组件
//   COMMON_COMPONENT: {
//     JvButton,
//     JvButtonGroup,
//     JvIcon,
//     JvDivider,
//     // Typography
//     JvTitle,
//     JvText,
//     JvLink,
//     JvParagraph,
//     JvEllipsis
//   },

//   // 数据录入组件
//   DATA_INPUT_COMPONENT: {
//     JvForm,
//     JvFormItem,
//     JvInput,
//     JvInputNumber,
//     JvTextarea,
//     JvRadio,
//     JvRadioGroup,
//     JvCheckbox,
//     JvSwitch,
//     JvRate,
//     JvSelect,
//     JvDatePicker,
//     JvTimePicker,
//     JvColorPicker,
//     JvUpload,
//     JvTransfer,
//     JvTree,
//     JvCascader,
//     JvTreeSelect,
//     JvSlider,
//     JvEditor,
//     JvDataTimePicker
//   },

//   // 数据展示组件
//   DATA_DISPLAY_COMPONENT: {
//     JvTable,
//     // JvTableColumn,
//     JvList,
//     JvListItem,
//     JvListGroup,
//     JvTree,
//     JvCard,
//     JvTag,
//     JvTimeline,
//     JvProgress,
//     JvAvatar,
//     JvImage,
//     JvVideo,
//     JvCarousel,
//     JvCalendar,
//     JvCollapse,
//     JvCollapseItem,
//     JvCode
//   },

//   // 布局组件
//   LAYOUT_COMPONENT: {
//     JvContainer,
//     JvRow,
//     JvCol,
//     JvColSpace,
//     JvSplit,
//     JvSpace,
//     JvAside,
//     JvHeader,
//     JvMain,
//     JvFooter
//   },

//   // 反馈组件
//   FEEDBACK_COMPONENT: {
//     JvAlert,
//     JvMessage,
//     JvNotification,
//     JvOverlay,
//     JvDrawer,
//     JvDialog,
//     JvTooltip,
//     JvLoading,
//     JvSkeleton,
//     JvResult,
//     JvEmpty,
//     JvBadge
//   },

//   // 导航组件
//   NAVIGATION_COMPONENT: {
//     JvAffix,
//     JvMenu,
//     JvBreadcrumb,
//     JvDropdown,
//     JvPagination,
//     JvSteps,
//     JvAnchor,
//     JvBackTop,
//     JvTabs
//   },

//   // 配置组件
//   CONFIG_COMPONENT: {
//     JvApp
//   },

//   // 其他组件
//   OTHER_COMPONENT: {
//     JvVirtualScroll,
//     JvScrollBar,
//     JvInfiniteScroll
//   }
// } as const
