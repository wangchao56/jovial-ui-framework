<script setup lang="ts">
import type { JvTimePickerEmits } from './JvTimePicker'
import JvScrollBox from '@/components/internal/JvScrollPanel.vue'
import JvPopper from '@/components/JvPopper/src/popper.vue'
import { createNamespace } from '@jienix/utils'
import { addHours, addMinutes, addSeconds, format } from 'date-fns'
import { computed, nextTick, ref, watch } from 'vue'
import { jvTimePickerProps } from './JvTimePicker'
import '../style/style.css'

const props = defineProps(jvTimePickerProps)

const emit = defineEmits<JvTimePickerEmits>()

const bem = createNamespace('time-picker')

// 固定每个时间列表的item高度
const itemHeight = 40

const showPanel = ref(false)
const inputValue = computed({
  get: () => props.modelValue || '',
  set: val => emit('update:modelValue', val || ''),
})

const hourScroll = ref<InstanceType<typeof JvScrollBox>>()
const minuteScroll = ref<InstanceType<typeof JvScrollBox>>()
const secondScroll = ref<InstanceType<typeof JvScrollBox>>()

const inputRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)

const selectedHour = ref('00')
const selectedMinute = ref('00')
const selectedSecond = ref('00')
function togglePanel() {
  if (!props.disabled) {
    showPanel.value = !showPanel.value
  }
}

// 生成小时列表
const baseDate = new Date(2000, 0, 1) // 基准日期
// 获取滚动条高度
// const scrollBarHeight = ref(0)
const hours = Array.from({ length: 24 }, (_, i) => {
  const date = addHours(baseDate, i) // 0-23 24小时制

  if (props.hourFormat === '12') {
    return {
      value: format(date, 'hh'),
      label: format(date, 'hh'),
    }
  }

  return {
    value: format(date, 'HH'),
    label: format(date, 'HH'),
  }
})

// 生成分钟列表
const minutes = Array.from({ length: 60 }, (_, i) => {
  const date = addMinutes(baseDate, i)
  return {
    value: format(date, 'mm'),
    label: format(date, 'mm'),
  }
})

// 生成秒列表
const seconds = Array.from({ length: 60 }, (_, i) => {
  const date = addSeconds(baseDate, i) // 0-59
  return {
    value: format(date, 'ss'),
    label: format(date, 'ss'),
  }
})

function handleTimeSelect(type: 'hour' | 'minute' | 'second', value: string) {
  if (props.disabled)
    return
  switch (type) {
    case 'hour':
      selectedHour.value = value
      break
    case 'minute':
      selectedMinute.value = value
      break
    case 'second':
      selectedSecond.value = value
      break
  }
}

function handleConfirm() {
  const newValue = `${selectedHour.value}:${selectedMinute.value}`
  if (validateTime(newValue)) {
    inputValue.value = newValue
    emit('change', newValue)
  }
  showPanel.value = false
}

watch([selectedHour, selectedMinute], () => {
  scrollToSelected()
})

watch(showPanel, async (val) => {
  if (val) {
    await nextTick()
    scrollToSelected()
  }
})
const timeRegex = /^(?:[01]?\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/
function validateTime(time: string) {
  return timeRegex.test(time)
}

watch(() => props.modelValue, (val) => {
  if (val && validateTime(val)) {
    const [hour, minute] = val.split(':')
    selectedHour.value = hour.padStart(2, '0')
    selectedMinute.value = minute.padStart(2, '0')
  }
}, { immediate: true })

async function scrollToSelected() {
  await nextTick()
  const positions = {
    hour: hours.findIndex(h => h.value === selectedHour.value) * itemHeight,
    minute: minutes.findIndex(m => m.value === selectedMinute.value) * itemHeight,
    second: seconds.findIndex(s => s.value === selectedSecond.value) * itemHeight,
  }

  hourScroll.value?.scrollTo(0, -positions.hour)
  minuteScroll.value?.scrollTo(0, -positions.minute)
  secondScroll.value?.scrollTo(0, -positions.second)
}

// 滚动区的padding样式
const scrollPadding = computed(() => {
  return {
    paddingTop: `${itemHeight * 2}px`,
    paddingBottom: `${itemHeight * 2}px`,
  }
})

function handleScrollEnd(type: 'hour' | 'minute' | 'second', pos: { x: number, y: number }) {
  const index = Math.round(Math.abs(pos.y) / itemHeight)
  switch (type) {
    case 'hour':
      selectedHour.value = hours[index].value
      break
    case 'minute':
      selectedMinute.value = minutes[index].value
      break
    case 'second':
      selectedSecond.value = seconds[index].value
      break
  }
}
</script>

<template>
  <div :class="[bem.b(), bem.is('disabled', disabled)]">
    <div :class="bem.e('input-wrapper')">
      <input
        v-model="inputValue"
        :class="bem.e('input')"
        :disabled="disabled"
        :placeholder="format"
        readonly
        @click="togglePanel"
      >
      <span :class="bem.e('icon')">
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
          <path d="M13 7h-2v6h6v-2h-4z" />
        </svg>
      </span>
    </div>

    <JvPopper ref="panelRef" :class="bem.e('panel')" :options="{ placement: 'bottom-start' }" :model-value="showPanel" :reference="inputRef">
      <div :class="bem.e('header')">
        <span :class="bem.e('header-item')">时</span>
        <span :class="bem.e('header-item')">分</span>
      </div>
      <div :class="bem.e('time-container')">
        <div :class="bem.e('column')">
          <JvScrollBox ref="hourScroll" height="200px" :snap="true" :snap-speed="400" @scroll-end="handleScrollEnd('hour', $event)">
            <ul :class="bem.e('list')" :style="scrollPadding">
              <li
                v-for="h in hours"
                :key="h.value"
                :class="[
                  bem.e('item'),
                  bem.is('selected', selectedHour === h.value),
                ]"
                @click="handleTimeSelect('hour', h.value)"
              >
                {{ h.label }}
              </li>
            </ul>
          </JvScrollBox>
        </div>

        <div :class="bem.e('column')">
          <JvScrollBox ref="minuteScroll" height="200px" :snap="true" :snap-speed="400" @scroll-end="handleScrollEnd('minute', $event)">
            <ul :class="bem.e('list')">
              <li
                v-for="m in minutes"
                :key="m.value"
                :class="[
                  bem.e('item'),
                  bem.is('selected', selectedMinute === m.value),
                ]"
                @click="handleTimeSelect('minute', m.value)"
              >
                {{ m.label }}
              </li>
            </ul>
          </JvScrollBox>
        </div>

        <div :class="bem.e('column')">
          <JvScrollBox ref="secondScroll" height="200px" :snap="true" :snap-speed="400" @scroll-end="handleScrollEnd('second', $event)">
            <ul :class="bem.e('list')">
              <li
                v-for="s in seconds"
                :key="s.value"
                :class="[
                  bem.e('item'),
                  bem.is('selected', selectedSecond === s.value),
                ]"
                @click="handleTimeSelect('second', s.value)"
              >
                {{ s.label }}
              </li>
            </ul>
          </JvScrollBox>
        </div>
      </div>

      <div :class="bem.e('footer')">
        <button
          :class="bem.e('action')"
          @click="handleConfirm"
        >
          确认
        </button>
        <button
          :class="bem.e('action')"
          @click="showPanel = false"
        >
          取消
        </button>
      </div>
    </JvPopper>
  </div>
</template>
