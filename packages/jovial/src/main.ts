import Jovial from '@components/index'
import * as directives from '@jovial/directives'
import ThemePlugin from '@jovial/utils/theme-plugin'
import { createApp } from 'vue'
import App from './App.vue'
import '@jovial/theme-chalk/src/index.css'

const app = createApp(App)
app.use(Jovial)
app.use(ThemePlugin)
app.directive('click-outside', directives.ClickOutside)
app.mount('#app')
app.config.performance = true // 开启性能追踪
