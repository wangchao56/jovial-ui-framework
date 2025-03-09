<script setup lang="ts">
import type {
  CalendarDateCell,
  CalendarDateCellTypeLiteral,
  CalendarEmits,
  CalendarProps,
  CalendarSlots,
} from './JvCalendar'
import { JvButton, JvButtonGroup } from '@components/JvButton'
import { useLocale } from '@jienix/jovial-locale'

import { createNamespace } from '@jienix/utils'
import {
  addMonths,
  addYears,
  endOfMonth,
  format,
  getDate,
  getDay,
  getDaysInMonth,
  isSameDay,
  setDate,
  startOfMonth,
  startOfWeek,
  subMonths,
  subYears,
} from 'date-fns'
import { computed, normalizeClass, ref, unref } from 'vue'
import {
  actionsMapEntries,
  CalendarDateCellType,
  weekMaping,
} from './JvCalendar'

defineOptions({ name: 'JvCalendar' })
const props = withDefaults(defineProps<CalendarProps>(), {
  title: '日历',
})
const emit = defineEmits<CalendarEmits>()
defineSlots<CalendarSlots>()

const nscal = createNamespace('calendar')
const nsTable = createNamespace('calendar-table')
const now = new Date()
const selectDay = ref<Date>()

const date = computed(() => {
  if (props.modelValue) {
    return props.modelValue
  }
  else {
    return now
  }
})
const locale = useLocale()
const yearMonth = ref(format(new Date(), 'yyyy.MM'))
// 表头部分
// 0-周日，1-周一...6-周六
const firstDayOfWeek = getDay(startOfWeek(new Date()))

const weekDays = computed(() => {
  return weekMaping.map((item, index) => {
    const day = (firstDayOfWeek + index) % 7
    return {
      label: item,
      value: day,
    }
  })
})

// 面板部分 7*6 = 42天
// 数据是二位数组
const rows = computed(() => {
  let list: CalendarDateCell[] = []
  // 算出当前月是从周几开始
  const firstDay = getDay(startOfMonth(unref(date)))

  const lastMonthLastDay = endOfMonth(subMonths(unref(date), 1))
  const lastMonthDaysCount = firstDay - firstDayOfWeek

  const preMonthDays: CalendarDateCell[] = Array.from({
    length: lastMonthDaysCount,
  })
    .map((_, idx) => getDate(lastMonthLastDay) - (lastMonthDaysCount - idx - 1))
    .map(item => ({
      day: item,
      isSelected: false,
      type: CalendarDateCellType.PREV_MONTH,
    }))
  // 算出当前月有多少天
  const daysInMonth = getDaysInMonth(unref(date))
  const currentMonthDays: CalendarDateCell[] = Array.from({
    length: daysInMonth,
  }).map((_, idx) => ({
    day: idx + 1,
    isSelected: false,
    type: CalendarDateCellType.CURRENT_MONTH,
  }))

  const nextMonthDays: CalendarDateCell[] = Array.from({
    length: 42 - preMonthDays.length - currentMonthDays.length,
  }).map((_, idx) => ({
    day: idx + 1,
    isSelected: false,
    type: CalendarDateCellType.NEXT_MONTH,
  }))
  list = [...preMonthDays, ...currentMonthDays, ...nextMonthDays]
  return Array.from({ length: 6 })
    .map((_, idx) => {
      return list.slice(idx * 7, (idx + 1) * 7)
    })
    .map(item => ({
      cells: item,
    }))
})

// 日期相关的方法
const prevMonthDay = computed(() => {
  const currentDate = unref(date)
  return setDate(startOfMonth(subMonths(currentDate, 1)), 1)
})

const nextMonthDay = computed(() => {
  const currentDate = unref(date)
  return setDate(startOfMonth(addMonths(currentDate, 1)), 1)
})

const prevYearDay = computed(() => {
  const currentDate = unref(date)
  return setDate(startOfMonth(subYears(currentDate, 1)), 1)
})

const nextYearDay = computed(() => {
  const currentDate = unref(date)
  return setDate(startOfMonth(addYears(currentDate, 1)), 1)
})

function pickDay(newDate: Date) {
  yearMonth.value = format(newDate, 'yyyy.MM')
  // 这里可以添加其他需要更新的逻辑，比如触发父组件的输入事件等
  emit('update:modelValue', newDate)
}

function selectDate(type: CalendarDateCellTypeLiteral) {
  // 采用策略模式
  const dateMap: {
    [key in CalendarDateCellTypeLiteral]: Date
  } = {
    [CalendarDateCellType.PREV_MONTH]: prevMonthDay.value,
    [CalendarDateCellType.NEXT_MONTH]: nextMonthDay.value,
    [CalendarDateCellType.PREV_YEAR]: prevYearDay.value,
    [CalendarDateCellType.NEXT_YEAR]: nextYearDay.value,
    [CalendarDateCellType.TODAY]: now,
    [CalendarDateCellType.CURRENT_MONTH]: date.value,
  }
  const day = dateMap[type]
  pickDay(day)
}

function formatter(day: number, type: CalendarDateCellTypeLiteral): Date {
  const currentDate = unref(date)
  switch (type) {
    case CalendarDateCellType.PREV_MONTH:
      return setDate(subMonths(startOfMonth(currentDate), 1), day)
    case CalendarDateCellType.NEXT_MONTH:
      return setDate(addMonths(startOfMonth(currentDate), 1), day)
    default:
      return setDate(currentDate, day)
  }
}

function getCellClass({ day, type }: CalendarDateCell) {
  const clazz: string[] = [nsTable.m(type)]
  const tempDay = formatter(day, type)
  if (unref(selectDay) && isSameDay(tempDay, unref(selectDay))) {
    clazz.push(nsTable.is('selected', true))
  }
  if (isSameDay(tempDay, now)) {
    clazz.push(nsTable.is('today', true))
  }
  return clazz
}

function handlePick({ day, type }: CalendarDateCell) {
  const tempDay = formatter(day, type)
  selectDay.value = tempDay
  pickDay(tempDay)
}
</script>

<template>
  <section :class="nscal.b()">
    <table :class="nsTable.b()">
      <caption :class="nsTable.e('caption')">
        <div :class="nsTable.e('header')">
          <slot name="header" :title="title">
            {{ title || '日历' }}
          </slot>
        </div>
        <div :class="nsTable.e('actions')">
          <button :class="normalizeClass(['jv-button', 'jv-button--text', nsTable.em('actions', 'text')])">
            {{ yearMonth }}
          </button>
          <JvButtonGroup rounded size="small" variant="tonal" justify="center" gap="2px" vertical>
            <JvButton
              v-for="btn in actionsMapEntries" :key="btn.key" size="small" variant="tonal"
              @click="() => selectDate(btn.key)"
            >
              {{ locale.t(btn.value) }}
            </JvButton>
          </JvButtonGroup>
        </div>
      </caption>
      <thead :class="nsTable.e('thead')">
        <tr>
          <th v-for="item in weekDays" :key="item.value">
            {{ item.label }}
          </th>
        </tr>
      </thead>
      <tbody :class="nsTable.e('tbody')">
        <tr v-for="(row, ix) in rows" :key="ix" :class="nsTable.e('row')">
          <td
            v-for="cell in row.cells" :key="cell?.day" :class="[
              nsTable.e('cell'),
              nsTable.m(cell.type),
              ...getCellClass(cell),
            ]" @click="() => handlePick(cell)"
          >
            <slot name="cell" :cell="cell">
              {{ cell.day }}
            </slot>
          </td>
        </tr>
      </tbody>
      <tfoot :class="nsTable.e('tfoot')">
        <slot name="footer" />
      </tfoot>
    </table>
  </section>
</template>
