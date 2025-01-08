const calendarProps = {
  modelValue: Date,
  title: String,
}
const calendarEmits = {
  'update:modelValue': value => value instanceof Date,
}
const calendarSlots = {}
var CalendarDateCellType = /* @__PURE__ */ ((CalendarDateCellType2) => {
  CalendarDateCellType2.PREV_MONTH = 'prev-month'
  CalendarDateCellType2.CURRENT_MONTH = 'current-month'
  CalendarDateCellType2.NEXT_MONTH = 'next-month'
  CalendarDateCellType2.NEXT_YEAR = 'next-year'
  CalendarDateCellType2.PREV_YEAR = 'prev-year'
  CalendarDateCellType2.TODAY = 'today'
  return CalendarDateCellType2
})(CalendarDateCellType || {})
var CalendarPeriod = /* @__PURE__ */ ((CalendarPeriod2) => {
  CalendarPeriod2.YEAR = 'year'
  CalendarPeriod2.MONTH = 'month'
  CalendarPeriod2.WEEK = 'week'
  CalendarPeriod2.DAY = 'day'
  return CalendarPeriod2
})(CalendarPeriod || {})
const actionsMap = {
  ['next-month' /* NEXT_MONTH */]: '\u4E0B\u4E00\u6708',
  ['prev-month' /* PREV_MONTH */]: '\u4E0A\u4E00\u6708',
  ['next-year' /* NEXT_YEAR */]: '\u4E0B\u4E00\u5E74',
  ['prev-year' /* PREV_YEAR */]: '\u4E0A\u4E00\u5E74',
  ['today' /* TODAY */]: '\u4ECA\u5929',
}
const actionsMapEntries = [
  {
    key: 'next-month' /* NEXT_MONTH */,
    value: '\u4E0B\u4E00\u6708',
    order: 3,
  },
  {
    key: 'prev-month' /* PREV_MONTH */,
    value: '\u4E0A\u4E00\u6708',
    order: 1,
  },
  {
    key: 'next-year' /* NEXT_YEAR */,
    value: '\u4E0B\u4E00\u5E74',
    order: 4,
  },
  {
    key: 'prev-year' /* PREV_YEAR */,
    value: '\u4E0A\u4E00\u5E74',
    order: 0,
  },
  {
    key: 'today' /* TODAY */,
    value: '\u4ECA\u5929',
    order: 2,
  },
].sort((a, b) => a.order - b.order)
const weekMaping = [
  '\u5468\u65E5',
  '\u5468\u4E00',
  '\u5468\u4E8C',
  '\u5468\u4E09',
  '\u5468\u56DB',
  '\u5468\u4E94',
  '\u5468\u516D',
]

export { actionsMap, actionsMapEntries, CalendarDateCellType, calendarEmits, CalendarPeriod, calendarProps, calendarSlots, weekMaping }
// # sourceMappingURL=calendar.mjs.map
