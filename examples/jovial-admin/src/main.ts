import jovialUi from 'jovial-ui/esm/packages/index.mjs'
import { createApp } from 'vue'
import App from './App.vue'
import './output.css'

const app = createApp(App)
app.use(jovialUi)
app.mount('#app')
