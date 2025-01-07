import { createApp } from 'vue'
import App from './App.vue'
import Jovial from '@components/index'
import '@jovial/theme-chalk/src/index.css'
const app = createApp(App)
app.use(Jovial)
app.mount('#app')
