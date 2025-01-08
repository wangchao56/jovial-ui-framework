import Jovial from '@components/index'
import { createApp } from 'vue'
import App from './App.vue'
import '@jovial/theme-chalk/src/index.css'

const app = createApp(App)
app.use(Jovial)
app.mount('#app')
