import { withInstall } from '@jienix/utils'
import _JvCard from './src/JvCard.vue'
import './style'

const JvCard = withInstall(_JvCard)

export * from './src/JvCard'
export default JvCard
export type JvJvCardInstance = InstanceType<typeof JvCard>
export type {
  JvCardEmits,
  JvCardExpose,
  JvCardProps,
  JvCardSlots,
} from './src/JvCard'
declare module 'vue' {
  export interface GlobalComponents {
    JvCard: typeof JvCard
  }
}
