import type { Size } from '@jienix/typings'
import type { PropType } from 'vue'

import * as internalIcons from '@components/internal-icon'

export const icons = {
  $close: internalIcons.MdiClose, // 关闭
  $eye: internalIcons.MdiEye, // 眼睛
  $eyeOff: internalIcons.MdiEyeOff, // 眼睛关闭
  $eyeOutline: internalIcons.MdiEyeOutline, // 眼睛轮廓
  $eyeOffOutline: internalIcons.MdiEyeOffOutline, // 眼睛关闭轮廓
  $loading: internalIcons.MdiLoading, // 加载
  $star: internalIcons.MdiStar, // 星星
  $starHalfFull: internalIcons.MdiStarHalfFull, // 星星半满
  $starOutline: internalIcons.MdiStarOutline, // 星星轮廓
  $information: internalIcons.MdiInformation, // 信息
  $informationOutline: internalIcons.MdiInformationOutline, // 信息轮廓
  $checkboxMarked: internalIcons.MdiCheckboxMarked, // 勾选
  $checkboxBlank: internalIcons.MdiCheckboxBlankOutline, // 空勾选
  $checkboxIntermediate: internalIcons.MdiCheckboxIntermediate, // 半勾选
  $calendarMonth: internalIcons.MdiCalendarMonth, // 日历
  $alarmCheck: internalIcons.MdiAlarmCheck, // 闹钟
  $chevronLeft: internalIcons.MdiChevronLeft, // 左箭头
  $chevronRight: internalIcons.MdiChevronRight, // 右箭头
  $radioBoxBlank: internalIcons.MdiRadioboxBlank, // 空单选框
  $radioBoxMarked: internalIcons.MdiRadioboxMarked, // 勾选单选框
  $success: internalIcons.MdiCheckDecagram, // 成功
  $successOutline: internalIcons.MdiCheckDecagramOutline, // 成功轮廓
  $warning: internalIcons.MdiAlertDecagram, // 警告
  $warningOutline: internalIcons.MdiAlertDecagramOutline, // 警告轮廓
  $error: internalIcons.MdiErrorDecagram, // 错误
  $errorOutline: internalIcons.MdiErrorDecagramOutline, // 错误轮廓
  $info: internalIcons.MdiInfoDecagram, // 信息
  $infoOutline: internalIcons.MdiInfoDecagramOutline, // 信息轮廓
}

export const jvIconProps = {
  /** 图标大小 */
  size: {
    type: [String, Number] as PropType<Size | string | number>,
    default: '1em',
  },
  /** 图标颜色 */
  color: {
    type: String,
    default: 'currentColor',
  },
  /** 图标名称 */
  name: {
    type: String,
  },
} as const

export type JvIconProps = ExtractPropTypes<typeof jvIconProps>
