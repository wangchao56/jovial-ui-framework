import type { App } from 'vue'
import AlertOutline from './AlertOutline'
import AlienOutline from './AlienOutline'
import CheckOutline from './CheckOutline'
import IconCloseThick from './close-thick'
import IconEyeOff from './IconEyeOff'
import IconEyeOn from './IconEyeOn'
import InfoOutline from './InfoOutline'
import Loading from './Loading'
import Radio from './Radio'
import RadioOutline from './RadioOutline'
import Star from './Star.vue'
import StarHalfFull from './StarHalfFull.vue'
import StarOutline from './StarOutline.vue'
import Switcher from './Switcher'

export { AlertOutline, AlienOutline, CheckOutline, IconCloseThick, IconEyeOff, IconEyeOn, InfoOutline, Loading, Star, StarOutline, Switcher }
export const internalIcons = {
  $close: IconCloseThick,
  $eyeOn: IconEyeOn,
  $eyeOff: IconEyeOff,
  $loading: Loading,
  $success: CheckOutline,
  $error: AlienOutline,
  $info: InfoOutline,
  $warning: AlertOutline,
  $switcher: Switcher,
  $star: Star,
  $starOutline: StarOutline,
  $starHalfFull: StarHalfFull,
  $radio: Radio,
  $radioOutline: RadioOutline,
}
export default {
  install(app: App) {
    const components = [AlertOutline, AlienOutline, CheckOutline, IconCloseThick, IconEyeOff, IconEyeOn, InfoOutline, Loading, Star, StarOutline, Switcher, Radio, RadioOutline]
    components.forEach(component => app.component(component.name, component))
  },
}
