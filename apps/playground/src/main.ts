import Jovial from '@/plugins'
import { createApp } from 'vue'
import App from '../../../apps/playground/src./../../apps/playground/src/App.vue'
import '@jovial/theme/src/index.css'

const app = createApp(App)
app.use(Jovial)

app.mount('#app')
app.config.performance = true // 开启性能追踪
app.config.globalProperties.$jovial = 'jovial components'
