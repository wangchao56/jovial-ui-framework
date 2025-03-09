import { withInstall } from '@jienix/utils'
import _JvCalendar from './src/JvCalendar.vue'
import './style'

const JvCalendar = withInstall(_JvCalendar)

export type {
  CalendarEmits,
  CalendarProps,
  CalendarSlots,
} from './src/JvCalendar'

export default JvCalendar
export type CalendarInstance = InstanceType<typeof JvCalendar>

export * from './src/JvCalendar'
declare module 'vue' {
  export interface GlobalComponents {
    JvCalendar: typeof JvCalendar
  }
}
