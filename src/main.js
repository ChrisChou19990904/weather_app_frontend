import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia' // 1. 引入 Pinia
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia() // 2. 建立實例

app.use(pinia) // 3. 關鍵：一定要在 mount 之前 use!
app.mount('#app')
