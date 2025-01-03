import { createApp } from 'vue'
import App from './App.vue'
import { plugins } from '../config'
const app = createApp(App)
plugins.forEach((plugin) => {
  app.use(plugin)
})
app.mount('#app')
