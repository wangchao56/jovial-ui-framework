import { withInstall } from '@jovial/utils'
import _JvCalendar from './src/JvCalendar.vue'

const JvCalendar = withInstall(_JvCalendar)

export type {
  CalendarEmits,
  CalendarProps,
  CalendarSlots,
} from './src/calendar'

export default JvCalendar
export type CalendarInstance = InstanceType<typeof JvCalendar>

export * from './src/JvCalendar'
declare module 'vue' {
  export interface GlobalComponents {
    JvCalendar: typeof JvCalendar
  }
}
