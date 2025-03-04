// 组件的分类
export const COMPONENT_CATEGORY = {
  DATA_INPUT_COMPONENT: '数据录入组件',
  DATA_DISPLAY_COMPONENT: '数据展示组件',
  LAYOUT_COMPONENT: '布局组件',
  FEEDBACK_COMPONENT: '反馈组件',
  NAVIGATION_COMPONENT: '导航组件',
  // 通用组件
  COMMON_COMPONENT: '通用组件',
  // 配置组件
  CONFIG_COMPONENT: '配置组件',
  // 其他组件
  OTHER_COMPONENT: '其他组件',
}

// 数据录入组件 数量: 20
export const DATA_INPUT_COMPONENT = {
  JV_FORM: 'JvForm', // 表单
  JV_FORM_ITEM: 'JvFormItem', // 表单项
  JV_INPUT: 'JvInput', // 输入框
  JV_TEXTAREA: 'JvTextarea', // 文本域
  JV_INPUT_NUMBER: 'JvInputNumber', // 数字输入框
  JV_CASCADE: 'JvCascade', // 级联选择器
  JV_SELECT: 'JvSelect', // 选择器
  JV_CHECKBOX: 'JvCheckbox', // 多选框
  JV_RADIO: 'JvRadio', // 单选框
  JV_SWITCH: 'JvSwitch', // 开关
  JV_DATE_PICKER: 'JvDatePicker', // 日期选择器
  JV_TIME_PICKER: 'JvTimePicker', // 时间选择器
  JV_COLOR_PICKER: 'JvColorPicker', // 颜色选择器
  JV_SLIDER: 'JvSlider', // 滑块
  JV_RATE: 'JvRate', // 评分
  JV_UPLOAD: 'JvUpload', // 上传
  JV_EDITOR: 'JvEditor', // 富文本编辑器
  JV_TREE_SELECT: 'JvTreeSelect', // 树形选择器
  JV_TRANSFER: 'JvTransfer', // 穿梭器
  JV_DATA_TIME_PICKER: 'JvDataTimePicker', // 日期时间选择器
}

// 数据展示组件 数量：14
export const DATA_DISPLAY_COMPONENT = {
  JV_TABLE: 'JvTable', // 表格
  JV_LIST: 'JvList', // 列表
  JV_TREE: 'JvTree', // 树
  JV_CARD: 'JvCard', // 卡片
  JV_TAG: 'JvTag', // 标签
  JV_TIMELINE: 'JvTimeline', // 时间轴
  JV_PROGRESS: 'JvProgress', // 进度条
  JV_IMAGE: 'JvImage', // 图片
  JV_CHART: 'JvChart', // 图表
  JV_VIDEO: 'JvVideo', // 视频
  JV_AUDIO: 'JvAudio', // 音频
  JV_CAROUSEL: 'JvCarousel', // 轮播图
  JV_CALENDAR: 'JvCalendar', // 日历
  JV_COLLAPSE: 'JvCollapse', // 折叠
  JV_CODE: 'JvCode', // 代码
}

// 布局组件 数量： 10
export const LAYOUT_COMPONENT = {
  JV_LAYOUT: 'JvLayout', // 布局
  JV_CONTAINER: 'JvContainer', // 容器
  JV_ROW: 'JvRow', // 行
  JV_COL: 'JvCol', // 列
  JV_SPLIT: 'JvSplit', // 分割
  JV_SPACE: 'JvSpace', // 间距
  JV_SIDEBAR: 'JvSidebar', // 侧边栏
  JV_HEADER: 'JvHeader', // 头部
  JV_MAIN: 'JvMain', // 主体
  JV_FOOTER: 'JvFooter', // 底部
}

// 反馈组件 数量：  12
export const FEEDBACK_COMPONENT = {
  JV_ALERT: 'JvAlert', // 提示框
  JV_MESSAGE: 'JvMessage', // 消息
  JV_NOTIFICATION: 'JvNotification', // 通知
  JV_POPOVER: 'JvPopover', // 弹窗
  JV_DRAWER: 'JvDrawer', // 抽屉
  JV_DIALOG: 'JvDialog', // 对话框
  JV_TOOLTIP: 'JvTooltip', // 提示
  JV_LOADING: 'JvLoading', // 加载中
  JV_SKELETON: 'JvSkeleton', // 骨架屏
  JV_RESULT: 'JvResult', // 结果
  JV_EMPTY: 'JvEmpty', // 空状态
  JV_BADGE: 'JvBadge', // 徽标
}

// 导航组件 数量： 9
export const NAVIGATION_COMPONENT = {
  JV_AFFIX: 'JvAffix', // 固钉
  JV_TABS: 'JvTabs', // 标签页
  JV_MENU: 'JvMenu', // 菜单
  JV_BREADCRUMB: 'JvBreadcrumb', // 面包屑
  JV_DROPDOWN: 'JvDropdown', // 下拉菜单
  JV_PAGINATION: 'JvPagination', // 分页
  JV_STEPS: 'JvSteps', // 步骤条
  JV_ANCHOR: 'JvAnchor', // 锚点
  JV_BACK_TOP: 'JvBackTop', // 回到顶部
}

// 通用组件 数量： 4
export const COMMON_COMPONENT = {
  JV_BUTTON: 'JvButton', // 按钮
  JV_BUTTON_GROUP: 'JvButtonGroup', // 按钮组
  JV_ICON: 'JvIcon', // 图标
  JV_DIVIDER: 'JvDivider', // 分割线
  // 排版类组件 JvTypography
  JV_TITLE: 'JvTitle', // 标题
  JV_TEXT: 'JvText', // 文本
  JV_LINK: 'JvLink', // 链接
  JV_PARAGRAPH: 'JvParagraph', // 段落
  // 文本省略组件
  JV_ELLIPSIS: 'JvEllipsis', // 省略
}

// 配置组件 数量： 1
export const CONFIG_COMPONENT = {
  JV_APP: 'JvApp', // 应用
}

// 其他组件 数量： 5
export const OTHER_COMPONENT = {
  JV_VIRTUAL_LIST: 'JvVirtualList', // 虚拟列表
  JV_VIRTUAL_SCROLL: 'JvVirtualScroll', // 虚拟滚动
  JV_VIRTUAL_TREE: 'JvVirtualTree', // 虚拟树
  JV_VIRTUAL_SELECT: 'JvVirtualSelect', // 虚拟选择器
  JV_INFINITE_SCROLL: 'JvInfiniteScroll', // 无限滚动
  JV_DRAG_DROP: 'JvDragDrop', // 拖拽
  JV_SCHEMA_FORM: 'JvSchemaForm', // 自定义表单
  JV_SCROLL_BAR: 'JvScrollBar', // 滚动条
}
