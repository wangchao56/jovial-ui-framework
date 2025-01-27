import type { App } from 'vue'
import components from '../components/components'
import { createJovialUI } from '../components/framework'
import * as directives from '../directives/index'

// 注册组件
const Jovial = createJovialUI({
  components,
  directives,
})

export function registerPlugins(app: App) {
  app.use(Jovial)
}

export default Jovial
