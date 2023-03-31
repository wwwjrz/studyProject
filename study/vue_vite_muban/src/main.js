import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
import { ElNotification } from 'element-plus'

app.config.globalProperties.$openNot = openElNotification
function openElNotification (type, title, message) {
  ElNotification({
    type,
    title,
    message,
  })
}



app.use(ElementPlus)
app.use(router)
app.mount('#app')
