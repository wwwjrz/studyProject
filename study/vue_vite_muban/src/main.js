import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import App from './App.vue'
import Directives from '@/directives';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import i18n from './locales/index'
import pinia from './stores'
import VueAMap, { initAMapApiLoader } from '@vuemap/vue-amap';
import '@vuemap/vue-amap/dist/style.css'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
import { ElNotification } from 'element-plus'

initAMapApiLoader({
  key: '7fdc79a0856c674d9dbbae89cb46e08c',
})

app.config.globalProperties.$openNot = openElNotification

app.config.globalProperties.$lanGuage = localStorage.getItem('lanGuage') || 'zh-cn'

function openElNotification (type, title, message) {
  ElNotification({
    type,
    title,
    message,
  })
}


app.use(VueAMap)
app.use(ElementPlus)
app.use(Directives)
app.use(pinia)
app.use(i18n)
app.use(router)
app.mount('#app')
