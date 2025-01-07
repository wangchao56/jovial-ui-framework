<template>
  <section :class="nscal.b()">
    <table :class="nsTable.b()">
      <caption :class="nsTable.e('caption')">
        <div :class="nsTable.e('header')">
          {{ title || '日历' }}
        </div>
        <div :class="nsTable.e('actions')">
          <span>
            <JvButton size="small" variant="text">{{ yearMonth }}</JvButton>
          </span>

          <div :class="nsTable.e('button-group')">
            <JvButton
              v-for="btn in actionsMapEntries"
              :key="btn.key"
              size="small"
              variant="tonal"
              @click="($event) => selectDate(btn.key)"
              >{{ btn.value }}</JvButton
            >
          </div>
        </div>
      </caption>
      <thead :class="nsTable.e('thead')">
        <tr>
          <th v-for="item in weekDays" :key="item.value">{{ item.label }}</th>
        </tr>
      </thead>
      <tbody :class="nsTable.e('tbody')">
        <tr v-for="(row, ix) in rows" :key="ix" :class="nsTable.e('row')">
          <td
            v-for="cell in row.cells"
            :key="cell?.day"
            :class="[
              nsTable.e('cell'),
              nsTable.m(cell.type),
              ...getCellClass(cell)
            ]"
            @click="($event) => handlePick(cell)"
          >
            {{ cell.day }}
          </td>
        </tr>
      </tbody>
      <tfoot :class="nsTable.e('tfoot')">
        <slot name="tfoot"></slot>
      </tfoot>
    </table>
  </section>
</template>
<script setup lang="ts">
import { computed, ref, unref } from 'vue'
import { createNamespace } from '@jovial/utils'
import {
  CalendarDateCell,
  CalendarDateCellType,
  calendarEmits,
  calendarProps,
  CalendarDateCellTypeLiteral,
  CalendarPeriod,
  weekMaping,
  actionsMapEntries
} from './calendar'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
defineOptions({ name: 'JvCalendar' })
const props = defineProps(calendarProps)
const emit = defineEmits(calendarEmits)
const nscal = createNamespace('calendar')
const nsTable = createNamespace('calendar-table')
const now = dayjs()
const selectDay = ref<Dayjs>()

const date = computed(() => {
  if (props.modelValue) {
    return dayjs(props.modelValue)
  } else {
    return now
  }
})

const yearMonth = ref(dayjs().format('YYYY.MM'))
//表头部分
// 0-周日，1-周一...6-周六
const fristDayofWeek = dayjs().startOf(CalendarPeriod.WEEK).day()

const weekDays = computed(() => {
  return weekMaping.map((item, index) => {
    const day = (fristDayofWeek + index) % 7
    return {
      label: item,
      value: day
    }
  })
})

//面板部分 7*6 = 42天
//数据是二位数组
const rows = computed(() => {
  let list: CalendarDateCell[] = []
  //算出当前月是从周几开始
  const fristDay = unref(date).startOf(CalendarPeriod.MONTH).day()

  const lastDay = unref(date)
    .subtract(1, CalendarPeriod.MONTH)
    .endOf(CalendarPeriod.MONTH)
    .date()

  const preMonthDaysCount = fristDay - fristDayofWeek

  const preMonthDays: CalendarDateCell[] = Array.from({
    length: preMonthDaysCount
  })
    .map((_, idx) => lastDay - (preMonthDaysCount - idx - 1))
    .map((item) => ({
      day: item,
      isSelected: false,
      type: CalendarDateCellType.PREV_MONTH
    }))
  //算出当前月有多少天
  const daysInMonth = dayjs().daysInMonth()
  const currentMonthDays: CalendarDateCell[] = Array.from({
    length: daysInMonth
  }).map((item, idx) => ({
    day: idx + 1,
    isSelected: false,
    type: CalendarDateCellType.CURRENT_MONTH
  }))

  const nextMonthDays: CalendarDateCell[] = Array.from({
    length: 42 - preMonthDays.length - currentMonthDays.length
  }).map((item, idx) => ({
    day: idx + 1,
    isSelected: false,
    type: CalendarDateCellType.NEXT_MONTH
  }))
  list = [...preMonthDays, ...currentMonthDays, ...nextMonthDays]
  return Array.from({ length: 6 })
    .map((_, idx) => {
      return list.slice(idx * 7, (idx + 1) * 7)
    })
    .map((item) => ({
      cells: item
    }))
})

// 日期相关的方法

const prevMonthDay = computed(() =>
  unref(date).subtract(1, CalendarPeriod.MONTH).date(1)
)
const nextMonthDay = computed(() =>
  unref(date).add(1, CalendarPeriod.MONTH).date(1)
)
const prevYearDay = computed(() =>
  unref(date).subtract(1, CalendarPeriod.YEAR).date(1)
)
const nextYearDay = computed(() =>
  unref(date).add(1, CalendarPeriod.YEAR).date(1)
)

function pickDay(newDate: dayjs.Dayjs) {
  yearMonth.value = newDate.format('YYYY.MM')
  // 这里可以添加其他需要更新的逻辑，比如触发父组件的输入事件等
  emit('update:modelValue', newDate.toDate())
}

function selectDate(type: CalendarDateCellTypeLiteral) {
  //采用策略模式
  const dateMap = {
    [CalendarDateCellType.PREV_MONTH]: prevMonthDay.value,
    [CalendarDateCellType.NEXT_MONTH]: nextMonthDay.value,
    [CalendarDateCellType.PREV_YEAR]: prevYearDay.value,
    [CalendarDateCellType.NEXT_YEAR]: nextYearDay.value,
    [CalendarDateCellType.TODAY]: now
  }
  const day = dateMap[type]
  pickDay(day)
}

function formatter(day: number, type: CalendarDateCellTypeLiteral) {
  switch (type) {
    case CalendarDateCellType.PREV_MONTH:
      return date.value
        .startOf(CalendarPeriod.MONTH)
        .subtract(1, CalendarPeriod.MONTH)
        .date(day)
    case CalendarDateCellType.NEXT_MONTH:
      return date.value
        .startOf(CalendarPeriod.MONTH)
        .add(1, CalendarPeriod.MONTH)
        .date(day)
    default:
      return date.value.date(day)
  }
}
const getCellClass = ({ day, type }: CalendarDateCell) => {
  const clazz: string[] = [nsTable.m(type)]
  let tempDay = formatter(day, type)
  if (tempDay.isSame(unref(selectDay), CalendarPeriod.DAY)) {
    clazz.push(nsTable.is('selected', true))
  }
  if (tempDay.isSame(now, CalendarPeriod.DAY)) {
    clazz.push(nsTable.is('today', true))
  }
  return clazz
}
function handlePick({ day, type }: CalendarDateCell) {
  let tempDay = formatter(day, type)
  selectDay.value = tempDay
  pickDay(tempDay)
}
</script>
