import { withInstall } from '@jovial/utils'
import _JvCalendar from './src/calendar.vue'

const JvCalendar = withInstall(_JvCalendar)

export * from './src/calendar'

export default JvCalendar
export type CalendarInstance = InstanceType<typeof JvCalendar>

export type {
  CalendarEmits,
  CalendarProps,
  CalendarSlots,
} from './src/calendar'
declare module 'vue' {
  export interface GlobalComponents {
    JvCalendar: typeof JvCalendar
  }
}
