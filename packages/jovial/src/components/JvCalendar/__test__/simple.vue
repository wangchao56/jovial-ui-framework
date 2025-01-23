<script setup lang="ts">
import type { CalendarDateCell, CalendarEmits, CalendarProps } from '../src/calendar'
import {
  addMonths,
  addYears,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  startOfMonth,
  startOfWeek,
  subMonths,
  subYears,
} from 'date-fns'
import { computed, ref, watch } from 'vue'
import { actionsMapEntries, CalendarDateCellType, weekMaping } from '../src/calendar'
import './simple.css'

defineOptions({ name: 'SimpleCalendar' })

const props = withDefaults(defineProps<CalendarProps>(), {
  modelValue: () => new Date(),
  title: undefined,
})

const emit = defineEmits<CalendarEmits>()

const currentDate = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  currentDate.value = newValue
})

const title = computed(() => {
  return props.title ?? format(currentDate.value, 'yyyy年MM月')
})

const cells = computed<CalendarDateCell[]>(() => {
  const monthStart = startOfMonth(currentDate.value)
  const monthEnd = endOfMonth(currentDate.value)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)

  const days = eachDayOfInterval({ start: startDate, end: endDate })

  return days.map((date): CalendarDateCell => {
    const day = date.getDate()
    const isSelected = isSameDay(date, currentDate.value)

    let type: CalendarDateCellType
    if (date.getMonth() < monthStart.getMonth()) {
      type = CalendarDateCellType.PREV_MONTH
    }
    else if (date.getMonth() > monthStart.getMonth()) {
      type = CalendarDateCellType.NEXT_MONTH
    }
    else {
      type = CalendarDateCellType.CURRENT_MONTH
    }

    if (isSameDay(date, new Date())) {
      type = CalendarDateCellType.TODAY
    }

    return {
      type,
      isSelected,
      day,
    }
  })
})

function selectDate(cell: CalendarDateCell) {
  const newDate = new Date(currentDate.value)
  newDate.setDate(cell.day)

  if (cell.type === CalendarDateCellType.PREV_MONTH) {
    newDate.setMonth(newDate.getMonth() - 1)
  }
  else if (cell.type === CalendarDateCellType.NEXT_MONTH) {
    newDate.setMonth(newDate.getMonth() + 1)
  }

  currentDate.value = newDate
  emit('update:modelValue', newDate)
}

function handleAction(type: CalendarDateCellType) {
  const newDate = new Date(currentDate.value)

  switch (type) {
    case CalendarDateCellType.PREV_MONTH:
      currentDate.value = subMonths(newDate, 1)
      break
    case CalendarDateCellType.NEXT_MONTH:
      currentDate.value = addMonths(newDate, 1)
      break
    case CalendarDateCellType.PREV_YEAR:
      currentDate.value = subYears(newDate, 1)
      break
    case CalendarDateCellType.NEXT_YEAR:
      currentDate.value = addYears(newDate, 1)
      break
    case CalendarDateCellType.TODAY:
      currentDate.value = new Date()
      break
  }

  emit('update:modelValue', currentDate.value)
}
</script>

<template>
  <div class="jv-calendar">
    <div class="jv-calendar__header">
      <slot name="header" :title="title">
        <h2 class="jv-calendar__title">
          {{ title }}
        </h2>
      </slot>
      <div class="jv-calendar__actions">
        <template v-for="action in actionsMapEntries" :key="action.key">
          <button
            class="jv-calendar__button"
            @click="handleAction(action.key)"
          >
            {{ action.value }}
          </button>
        </template>
      </div>
    </div>

    <div class="jv-calendar__weekdays">
      <div
        v-for="week in weekMaping"
        :key="week"
        class="jv-calendar__weekday"
      >
        {{ week }}
      </div>
    </div>

    <div class="jv-calendar__grid">
      <template v-for="cell in cells" :key="`${cell.day}-${cell.type}`">
        <slot name="cell" :cell="cell">
          <div
            class="jv-calendar__cell"
            :class="{
              'jv-calendar__cell--selected': cell.isSelected,
              'jv-calendar__cell--inactive': cell.type !== 'current-month',
            }"
            @click="selectDate(cell)"
          >
            {{ cell.day }}
          </div>
        </slot>
      </template>
    </div>

    <div class="jv-calendar__footer">
      <slot name="footer" />
    </div>
  </div>
</template>
