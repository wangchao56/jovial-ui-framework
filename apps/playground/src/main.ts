import { createApp } from 'vue'
import App from './App.vue'
import Jovial from './plugins'
import '@jienix/jovial-theme/src/index.scss'

const app = createApp(App)
app.use(Jovial)

app.mount('#app')
app.config.performance = true // 开启性能追踪
app.config.globalProperties.$jovial = 'jovial components'
