import App from '@/App.vue'
import { createApp } from 'vue'
import Jovial from './plugins'
import '@jienix/jovial-theme/src/index.css'

const app = createApp(App)
app.use(Jovial)

app.mount('#app')
app.config.performance = true // 开启性能追踪
app.config.globalProperties.$jovial = 'jovial components'
