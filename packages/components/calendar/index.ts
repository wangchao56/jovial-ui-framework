import _Calendar from './src/calendar.vue'
import { withInstall } from '@jovial/utils'

const JvCalendar = withInstall(_Calendar)

export * from './src/calendar'

export default JvCalendar
export type CalendarInstance = InstanceType<typeof JvCalendar>

export type {
  CalendarEmits,
  CalendarProps,
  CalendarExpose,
  CalendarSlots
} from './src/calendar'
declare module 'vue' {
  export interface GlobalComponents {
    JvCalendar: typeof JvCalendar
  }
}
