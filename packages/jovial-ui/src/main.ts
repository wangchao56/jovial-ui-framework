import Jovial from '@/plugins'
// import Jovial from '@components/index'
import { createApp } from 'vue'
import router from '../../../examples/jovial-admin/src/router'
import App from './App.vue'
import '@jovial/theme/src/index.css'

const app = createApp(App)
app.use(Jovial)

app.use(router)
app.mount('#app')
app.config.performance = true // 开启性能追踪
app.config.globalProperties.$jovial = 'jovial components'
