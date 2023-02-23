import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
    name: '/', // @fixme 需要全局判断用户是否已经登录
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/home.vue'),
    meta: {
      title: '首页',
    },
    redirect: '/homePage',
    children: [
      {
        path: '/homePage',
        name: 'homePage',
        component: () => import('../views/home/admin.vue'),
        meta: {
          title: '主页',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
