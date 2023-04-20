import { createRouter, createWebHistory } from "vue-router";

// 创建路由规则
let routes = [
  {
    path: '/',
    redirect: '/login',
    name: '/', // @fixme 需要全局判断用户是否已经登录
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../login.vue'),
  },
  
  {
    path: '/homePage',
    name: 'homePage',
    component: () => import('../view/home/home.vue'),
    redirect: '/index',
    meta:{
      name:'首页'
    },
    children: [
      {
        path:'/index',
        name:'Index',
        component:() => import('../view/index/index.vue'),
        meta:{
          isTap:true
        }
      },
      {
        path: 'element',
        name: 'homeIndex',
        component: () => import('../view/element/element.vue'),
        meta:{
          name:'组件'
        },
        children: [
          {
            path: '/element/skeleton',
            name: 'skeleton',
            meta:{
              name:'骨架屏'
            },
            component: () => import('../view/element/skeleton/skeleton.vue')
          }
        ]
      },

    ]
  }
]

// 创建路由
const router = createRouter({
  // 使用 history 模式
  history: createWebHistory(),
  // 路由规则
  routes
})

// 将路由对象暴露出去
export default router