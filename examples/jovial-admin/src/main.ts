import jovialUi from 'jovial-ui'
import { createApp } from 'vue'
import App from './App.vue'
import slideInDirective from './slide-in'
import './output.css'

const app = createApp(App)
app.use(jovialUi)

app.use({
  install(app) {
    console.log(app._context)
  },
})

app.directive('slide-in', slideInDirective)
app.mount('#app')
