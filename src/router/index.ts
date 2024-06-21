import { createRouter, createWebHistory } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    showTabBar: boolean
    showTopBar: boolean
    showLeftArrow: boolean
    title?: string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      redirect: '/login',
      children: []
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: {
        showTabBar: false,
        showTopBar: false,
        showLeftArrow: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
      meta: {
        title: "注册",
        showTabBar: false,
        showTopBar: true,
        showLeftArrow: true
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('@/views/MineView.vue'),
      meta: {
        title: "我的",
        showTabBar: true,
        showTopBar: true,
        showLeftArrow: false
      }
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: () => import('@/views/FeedbackView.vue'),
      meta: {
        title: "反馈",
        showTabBar: true,
        showTopBar: true,
        showLeftArrow: false
      }
    }
  ]
})

export default router
