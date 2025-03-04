import { withInstall } from '@jienix/utils'
import _JvCarousel from './src/JvCarousel.vue'
import './style'

const JvCarousel = withInstall(_JvCarousel)

export * from './src/JvCarousel'
export default JvCarousel
export type JvJvCarouselInstance = InstanceType<typeof JvCarousel>
export type {
  JvCarouselEmits,
  JvCarouselExpose,
  JvCarouselProps,
  JvCarouselSlots,
} from './src/JvCarousel'
declare module 'vue' {
  export interface GlobalComponents {
    JvCarousel: typeof JvCarousel
  }
}
