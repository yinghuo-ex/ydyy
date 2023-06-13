import { createApp } from 'vue'
import App from './App.vue'
// import App from './view/index.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'
import axios from 'axios'
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(store)
document.user = 'ini'
app.config.globalProperties.$axios = axios.create({
  baseURL: 'http://localhost:3000/api'
})

app.mount('#app')
