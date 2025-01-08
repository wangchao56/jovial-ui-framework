import { computed, createBlock, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, Fragment, normalizeClass, openBlock, ref, renderList, renderSlot, resolveComponent, toDisplayString, unref, withCtx } from 'vue'
import dayjs from '../../../../_virtual/dayjs.min.mjs'
import { createNamespace } from '../../../utils/create.mjs'
import { actionsMapEntries, CalendarDateCellType, calendarEmits, CalendarPeriod, calendarProps, weekMaping } from './calendar.mjs'

const _hoisted_1 = ['onClick']
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: 'JvCalendar' },
  __name: 'calendar',
  props: calendarProps,
  emits: calendarEmits,
  setup(__props, { emit: __emit }) {
    const props = __props
    const emit = __emit
    const nscal = createNamespace('calendar')
    const nsTable = createNamespace('calendar-table')
    const now = dayjs()
    const selectDay = ref()
    const date = computed(() => {
      if (props.modelValue) {
        return dayjs(props.modelValue)
      }
      else {
        return now
      }
    })
    const yearMonth = ref(dayjs().format('YYYY.MM'))
    const fristDayofWeek = dayjs().startOf(CalendarPeriod.WEEK).day()
    const weekDays = computed(() => {
      return weekMaping.map((item, index) => {
        const day = (fristDayofWeek + index) % 7
        return {
          label: item,
          value: day,
        }
      })
    })
    const rows = computed(() => {
      let list = []
      const fristDay = unref(date).startOf(CalendarPeriod.MONTH).day()
      const lastDay = unref(date).subtract(1, CalendarPeriod.MONTH).endOf(CalendarPeriod.MONTH).date()
      const preMonthDaysCount = fristDay - fristDayofWeek
      const preMonthDays = Array.from({
        length: preMonthDaysCount,
      }).map((_, idx) => lastDay - (preMonthDaysCount - idx - 1)).map(item => ({
        day: item,
        isSelected: false,
        type: CalendarDateCellType.PREV_MONTH,
      }))
      const daysInMonth = dayjs().daysInMonth()
      const currentMonthDays = Array.from({
        length: daysInMonth,
      }).map((item, idx) => ({
        day: idx + 1,
        isSelected: false,
        type: CalendarDateCellType.CURRENT_MONTH,
      }))
      const nextMonthDays = Array.from({
        length: 42 - preMonthDays.length - currentMonthDays.length,
      }).map((item, idx) => ({
        day: idx + 1,
        isSelected: false,
        type: CalendarDateCellType.NEXT_MONTH,
      }))
      list = [...preMonthDays, ...currentMonthDays, ...nextMonthDays]
      return Array.from({ length: 6 }).map((_, idx) => {
        return list.slice(idx * 7, (idx + 1) * 7)
      }).map(item => ({
        cells: item,
      }))
    })
    const prevMonthDay = computed(
      () => unref(date).subtract(1, CalendarPeriod.MONTH).date(1),
    )
    const nextMonthDay = computed(
      () => unref(date).add(1, CalendarPeriod.MONTH).date(1),
    )
    const prevYearDay = computed(
      () => unref(date).subtract(1, CalendarPeriod.YEAR).date(1),
    )
    const nextYearDay = computed(
      () => unref(date).add(1, CalendarPeriod.YEAR).date(1),
    )
    function pickDay(newDate) {
      yearMonth.value = newDate.format('YYYY.MM')
      emit('update:modelValue', newDate.toDate())
    }
    function selectDate(type) {
      const dateMap = {
        [CalendarDateCellType.PREV_MONTH]: prevMonthDay.value,
        [CalendarDateCellType.NEXT_MONTH]: nextMonthDay.value,
        [CalendarDateCellType.PREV_YEAR]: prevYearDay.value,
        [CalendarDateCellType.NEXT_YEAR]: nextYearDay.value,
        [CalendarDateCellType.TODAY]: now,
      }
      const day = dateMap[type]
      pickDay(day)
    }
    function formatter(day, type) {
      switch (type) {
        case CalendarDateCellType.PREV_MONTH:
          return date.value.startOf(CalendarPeriod.MONTH).subtract(1, CalendarPeriod.MONTH).date(day)
        case CalendarDateCellType.NEXT_MONTH:
          return date.value.startOf(CalendarPeriod.MONTH).add(1, CalendarPeriod.MONTH).date(day)
        default:
          return date.value.date(day)
      }
    }
    const getCellClass = ({ day, type }) => {
      const clazz = [nsTable.m(type)]
      const tempDay = formatter(day, type)
      if (tempDay.isSame(unref(selectDay), CalendarPeriod.DAY)) {
        clazz.push(nsTable.is('selected', true))
      }
      if (tempDay.isSame(now, CalendarPeriod.DAY)) {
        clazz.push(nsTable.is('today', true))
      }
      return clazz
    }
    function handlePick({ day, type }) {
      const tempDay = formatter(day, type)
      selectDay.value = tempDay
      pickDay(tempDay)
    }
    return (_ctx, _cache) => {
      const _component_JvButton = resolveComponent('JvButton')
      return openBlock(), createElementBlock(
        'section',
        {
          class: normalizeClass(unref(nscal).b()),
        },
        [
          createElementVNode(
            'table',
            {
              class: normalizeClass(unref(nsTable).b()),
            },
            [
              createElementVNode(
                'caption',
                {
                  class: normalizeClass(unref(nsTable).e('caption')),
                },
                [
                  createElementVNode(
                    'div',
                    {
                      class: normalizeClass(unref(nsTable).e('header')),
                    },
                    toDisplayString(_ctx.title || '\u65E5\u5386'),
                    3,
                    /* TEXT, CLASS */
                  ),
                  createElementVNode(
                    'div',
                    {
                      class: normalizeClass(unref(nsTable).e('actions')),
                    },
                    [
                      createElementVNode('span', null, [
                        createVNode(_component_JvButton, {
                          size: 'small',
                          variant: 'text',
                        }, {
                          default: withCtx(() => [
                            createTextVNode(
                              toDisplayString(yearMonth.value),
                              1,
                              /* TEXT */
                            ),
                          ]),
                          _: 1,
                          /* STABLE */
                        }),
                      ]),
                      createElementVNode(
                        'div',
                        {
                          class: normalizeClass(unref(nsTable).e('button-group')),
                        },
                        [
                          (openBlock(true), createElementBlock(
                            Fragment,
                            null,
                            renderList(unref(actionsMapEntries), (btn) => {
                              return openBlock(), createBlock(_component_JvButton, {
                                key: btn.key,
                                size: 'small',
                                variant: 'tonal',
                                onClick: $event => selectDate(btn.key),
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(
                                    toDisplayString(btn.value),
                                    1,
                                    /* TEXT */
                                  ),
                                ]),
                                _: 2,
                                /* DYNAMIC */
                              }, 1032, ['onClick'])
                            }),
                            128,
                            /* KEYED_FRAGMENT */
                          )),
                        ],
                        2,
                        /* CLASS */
                      ),
                    ],
                    2,
                    /* CLASS */
                  ),
                ],
                2,
                /* CLASS */
              ),
              createElementVNode(
                'thead',
                {
                  class: normalizeClass(unref(nsTable).e('thead')),
                },
                [
                  createElementVNode('tr', null, [
                    (openBlock(true), createElementBlock(
                      Fragment,
                      null,
                      renderList(weekDays.value, (item) => {
                        return openBlock(), createElementBlock(
                          'th',
                          {
                            key: item.value,
                          },
                          toDisplayString(item.label),
                          1,
                          /* TEXT */
                        )
                      }),
                      128,
                      /* KEYED_FRAGMENT */
                    )),
                  ]),
                ],
                2,
                /* CLASS */
              ),
              createElementVNode(
                'tbody',
                {
                  class: normalizeClass(unref(nsTable).e('tbody')),
                },
                [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(rows.value, (row, ix) => {
                      return openBlock(), createElementBlock(
                        'tr',
                        {
                          key: ix,
                          class: normalizeClass(unref(nsTable).e('row')),
                        },
                        [
                          (openBlock(true), createElementBlock(
                            Fragment,
                            null,
                            renderList(row.cells, (cell) => {
                              return openBlock(), createElementBlock('td', {
                                key: cell == null ? undefined : cell.day,
                                class: normalizeClass([
                                  unref(nsTable).e('cell'),
                                  unref(nsTable).m(cell.type),
                                  ...getCellClass(cell),
                                ]),
                                onClick: $event => handlePick(cell),
                              }, toDisplayString(cell.day), 11, _hoisted_1)
                            }),
                            128,
                            /* KEYED_FRAGMENT */
                          )),
                        ],
                        2,
                        /* CLASS */
                      )
                    }),
                    128,
                    /* KEYED_FRAGMENT */
                  )),
                ],
                2,
                /* CLASS */
              ),
              createElementVNode(
                'tfoot',
                {
                  class: normalizeClass(unref(nsTable).e('tfoot')),
                },
                [
                  renderSlot(_ctx.$slots, 'tfoot'),
                ],
                2,
                /* CLASS */
              ),
            ],
            2,
            /* CLASS */
          ),
        ],
        2,
        /* CLASS */
      )
    }
  },
})

export { _sfc_main as default }
// # sourceMappingURL=calendar.vue2.mjs.map
