import Jovial from '@/plugins'
// import Jovial from '@components/index'
import ThemePlugin from '@jovial/utils/theme-plugin'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@jovial/theme-chalk/src/index.css'

const app = createApp(App)
app.use(Jovial)

// app.use(Jovial)
app.use(ThemePlugin)
app.use(router)
// app.directive('click-outside', directives.ClickOutside)
// app.directive('badge', directives.Badge)
app.mount('#app')
app.config.performance = true // 开启性能追踪
app.config.globalProperties.$jovial = 'jovial components'
