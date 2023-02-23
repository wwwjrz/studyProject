import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import store from './store'
const vm = createApp(App)

import { notification } from 'ant-design-vue'
vm.config.globalProperties.$formatTime = openNotificationWithIcon
function openNotificationWithIcon(
  type: string,
  message: unknown,
  description: unknown
) {
  notification[type]({
    message,
    description,
  })
}

vm.use(store).use(Antd).use(router).mount('#app')
