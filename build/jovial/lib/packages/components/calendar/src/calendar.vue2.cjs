'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var create = require('../../../utils/create.cjs');
var calendar = require('./calendar.cjs');
var dayjs_min = require('../../../../_virtual/dayjs.min.cjs');

const _hoisted_1 = ["onClick"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{ name: "JvCalendar" },
  __name: "calendar",
  props: calendar.calendarProps,
  emits: calendar.calendarEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const nscal = create.createNamespace("calendar");
    const nsTable = create.createNamespace("calendar-table");
    const now = dayjs_min.default();
    const selectDay = vue.ref();
    const date = vue.computed(() => {
      if (props.modelValue) {
        return dayjs_min.default(props.modelValue);
      } else {
        return now;
      }
    });
    const yearMonth = vue.ref(dayjs_min.default().format("YYYY.MM"));
    const fristDayofWeek = dayjs_min.default().startOf(calendar.CalendarPeriod.WEEK).day();
    const weekDays = vue.computed(() => {
      return calendar.weekMaping.map((item, index) => {
        const day = (fristDayofWeek + index) % 7;
        return {
          label: item,
          value: day
        };
      });
    });
    const rows = vue.computed(() => {
      let list = [];
      const fristDay = vue.unref(date).startOf(calendar.CalendarPeriod.MONTH).day();
      const lastDay = vue.unref(date).subtract(1, calendar.CalendarPeriod.MONTH).endOf(calendar.CalendarPeriod.MONTH).date();
      const preMonthDaysCount = fristDay - fristDayofWeek;
      const preMonthDays = Array.from({
        length: preMonthDaysCount
      }).map((_, idx) => lastDay - (preMonthDaysCount - idx - 1)).map((item) => ({
        day: item,
        isSelected: false,
        type: calendar.CalendarDateCellType.PREV_MONTH
      }));
      const daysInMonth = dayjs_min.default().daysInMonth();
      const currentMonthDays = Array.from({
        length: daysInMonth
      }).map((item, idx) => ({
        day: idx + 1,
        isSelected: false,
        type: calendar.CalendarDateCellType.CURRENT_MONTH
      }));
      const nextMonthDays = Array.from({
        length: 42 - preMonthDays.length - currentMonthDays.length
      }).map((item, idx) => ({
        day: idx + 1,
        isSelected: false,
        type: calendar.CalendarDateCellType.NEXT_MONTH
      }));
      list = [...preMonthDays, ...currentMonthDays, ...nextMonthDays];
      return Array.from({ length: 6 }).map((_, idx) => {
        return list.slice(idx * 7, (idx + 1) * 7);
      }).map((item) => ({
        cells: item
      }));
    });
    const prevMonthDay = vue.computed(
      () => vue.unref(date).subtract(1, calendar.CalendarPeriod.MONTH).date(1)
    );
    const nextMonthDay = vue.computed(
      () => vue.unref(date).add(1, calendar.CalendarPeriod.MONTH).date(1)
    );
    const prevYearDay = vue.computed(
      () => vue.unref(date).subtract(1, calendar.CalendarPeriod.YEAR).date(1)
    );
    const nextYearDay = vue.computed(
      () => vue.unref(date).add(1, calendar.CalendarPeriod.YEAR).date(1)
    );
    function pickDay(newDate) {
      yearMonth.value = newDate.format("YYYY.MM");
      emit("update:modelValue", newDate.toDate());
    }
    function selectDate(type) {
      const dateMap = {
        [calendar.CalendarDateCellType.PREV_MONTH]: prevMonthDay.value,
        [calendar.CalendarDateCellType.NEXT_MONTH]: nextMonthDay.value,
        [calendar.CalendarDateCellType.PREV_YEAR]: prevYearDay.value,
        [calendar.CalendarDateCellType.NEXT_YEAR]: nextYearDay.value,
        [calendar.CalendarDateCellType.TODAY]: now
      };
      const day = dateMap[type];
      pickDay(day);
    }
    function formatter(day, type) {
      switch (type) {
        case calendar.CalendarDateCellType.PREV_MONTH:
          return date.value.startOf(calendar.CalendarPeriod.MONTH).subtract(1, calendar.CalendarPeriod.MONTH).date(day);
        case calendar.CalendarDateCellType.NEXT_MONTH:
          return date.value.startOf(calendar.CalendarPeriod.MONTH).add(1, calendar.CalendarPeriod.MONTH).date(day);
        default:
          return date.value.date(day);
      }
    }
    const getCellClass = ({ day, type }) => {
      const clazz = [nsTable.m(type)];
      let tempDay = formatter(day, type);
      if (tempDay.isSame(vue.unref(selectDay), calendar.CalendarPeriod.DAY)) {
        clazz.push(nsTable.is("selected", true));
      }
      if (tempDay.isSame(now, calendar.CalendarPeriod.DAY)) {
        clazz.push(nsTable.is("today", true));
      }
      return clazz;
    };
    function handlePick({ day, type }) {
      let tempDay = formatter(day, type);
      selectDay.value = tempDay;
      pickDay(tempDay);
    }
    return (_ctx, _cache) => {
      const _component_JvButton = vue.resolveComponent("JvButton");
      return vue.openBlock(), vue.createElementBlock(
        "section",
        {
          class: vue.normalizeClass(vue.unref(nscal).b())
        },
        [
          vue.createElementVNode(
            "table",
            {
              class: vue.normalizeClass(vue.unref(nsTable).b())
            },
            [
              vue.createElementVNode(
                "caption",
                {
                  class: vue.normalizeClass(vue.unref(nsTable).e("caption"))
                },
                [
                  vue.createElementVNode(
                    "div",
                    {
                      class: vue.normalizeClass(vue.unref(nsTable).e("header"))
                    },
                    vue.toDisplayString(_ctx.title || "\u65E5\u5386"),
                    3
                    /* TEXT, CLASS */
                  ),
                  vue.createElementVNode(
                    "div",
                    {
                      class: vue.normalizeClass(vue.unref(nsTable).e("actions"))
                    },
                    [
                      vue.createElementVNode("span", null, [
                        vue.createVNode(_component_JvButton, {
                          size: "small",
                          variant: "text"
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode(
                              vue.toDisplayString(yearMonth.value),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 1
                          /* STABLE */
                        })
                      ]),
                      vue.createElementVNode(
                        "div",
                        {
                          class: vue.normalizeClass(vue.unref(nsTable).e("button-group"))
                        },
                        [
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList(vue.unref(calendar.actionsMapEntries), (btn) => {
                              return vue.openBlock(), vue.createBlock(_component_JvButton, {
                                key: btn.key,
                                size: "small",
                                variant: "tonal",
                                onClick: ($event) => selectDate(btn.key)
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createTextVNode(
                                    vue.toDisplayString(btn.value),
                                    1
                                    /* TEXT */
                                  )
                                ]),
                                _: 2
                                /* DYNAMIC */
                              }, 1032, ["onClick"]);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ],
                        2
                        /* CLASS */
                      )
                    ],
                    2
                    /* CLASS */
                  )
                ],
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "thead",
                {
                  class: vue.normalizeClass(vue.unref(nsTable).e("thead"))
                },
                [
                  vue.createElementVNode("tr", null, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(weekDays.value, (item) => {
                        return vue.openBlock(), vue.createElementBlock(
                          "th",
                          {
                            key: item.value
                          },
                          vue.toDisplayString(item.label),
                          1
                          /* TEXT */
                        );
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ],
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "tbody",
                {
                  class: vue.normalizeClass(vue.unref(nsTable).e("tbody"))
                },
                [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(rows.value, (row, ix) => {
                      return vue.openBlock(), vue.createElementBlock(
                        "tr",
                        {
                          key: ix,
                          class: vue.normalizeClass(vue.unref(nsTable).e("row"))
                        },
                        [
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList(row.cells, (cell) => {
                              return vue.openBlock(), vue.createElementBlock("td", {
                                key: cell == null ? undefined : cell.day,
                                class: vue.normalizeClass([
                                  vue.unref(nsTable).e("cell"),
                                  vue.unref(nsTable).m(cell.type),
                                  ...getCellClass(cell)
                                ]),
                                onClick: ($event) => handlePick(cell)
                              }, vue.toDisplayString(cell.day), 11, _hoisted_1);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ],
                        2
                        /* CLASS */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "tfoot",
                {
                  class: vue.normalizeClass(vue.unref(nsTable).e("tfoot"))
                },
                [
                  vue.renderSlot(_ctx.$slots, "tfoot")
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=calendar.vue2.cjs.map
