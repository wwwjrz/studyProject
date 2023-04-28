import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/home.vue'),
    children: [
      {
        path: '/injectComponent',
        name: 'component',
        component: () => import('@/views/home/injectComponent/component.vue')
      },
      {
        path: '/customModel',
        name: 'customModel',
        component: () => import('@/views/home/customModel/customModel.vue')
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
