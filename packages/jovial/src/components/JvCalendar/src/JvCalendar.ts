import type { VNodeChild } from 'vue'

export interface CalendarProps {
  /** 日期 */
  modelValue?: Date
  /** 标题 */
  title?: string
}

export interface CalendarEmits {
  /** 日期改变 */
  (e: 'update:modelValue', value: Date): void
}

interface SlotCell {
  cell: CalendarDateCell
}

export interface CalendarSlots {
  cell: ({ cell }: SlotCell) => VNodeChild
  header: ({ title }: { title: string }) => VNodeChild
  footer: () => VNodeChild
}
// export type CalendarExpose = {}

export enum CalendarDateCellType {
  PREV_MONTH = 'prev-month',
  CURRENT_MONTH = 'current-month',
  NEXT_MONTH = 'next-month',
  NEXT_YEAR = 'next-year',
  PREV_YEAR = 'prev-year',
  TODAY = 'today',
}

export enum CalendarPeriod {
  YEAR = 'year',
  MONTH = 'month',
  WEEK = 'week',
  DAY = 'day',
}
export const actionsMap = {
  [CalendarDateCellType.NEXT_MONTH]: 'nextMonth',
  [CalendarDateCellType.PREV_MONTH]: 'prevMonth',
  [CalendarDateCellType.NEXT_YEAR]: 'nextYear',
  [CalendarDateCellType.PREV_YEAR]: 'prevYear',
  [CalendarDateCellType.TODAY]: 'today',
}
export const actionsMapEntries = [
  {
    key: CalendarDateCellType.NEXT_MONTH,
    value: 'nextMonth',
    order: 3,
  },
  {
    key: CalendarDateCellType.PREV_MONTH,
    value: 'prevMonth',
    order: 1,
  },
  {
    key: CalendarDateCellType.NEXT_YEAR,
    value: 'nextYear',
    order: 4,
  },
  {
    key: CalendarDateCellType.PREV_YEAR,
    value: 'prevYear',
    order: 0,
  },
  {
    key: CalendarDateCellType.TODAY,
    value: 'today',
    order: 2,
  },
].sort((a, b) => a.order - b.order)

// 将enum CalendarDateCellType 转为字面量类型
export type CalendarDateCellTypeLiteral =
  (typeof CalendarDateCellType)[keyof typeof CalendarDateCellType]

export interface CalendarDateCell {
  type: CalendarDateCellTypeLiteral
  isSelected: boolean
  day: number
  // date: Date
}

export const weekMaping = [
  '周日',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
]
