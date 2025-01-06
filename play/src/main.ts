import { createApp } from 'vue'
import App from './App.vue'
import { plugins } from '../config'
import ListItem from './item.vue'
import Jovial from '../../packages/index'
const app = createApp(App)
app.use(Jovial)
app.mount('#app')
