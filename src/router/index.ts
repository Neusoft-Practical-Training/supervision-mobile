import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from "@/stores";

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
      path: '/updateUserInfo',
      name: 'update user info',
      component: () => import('@/views/UpdateUserInfoView.vue'),
      meta: {
        title: "更新信息",
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
    },
    {
      path: '/feedbackHistory',
      name: 'feedback history',
      component: () => import('@/views/FeedbackHistoryView.vue'),
      meta: {
        title: "反馈历史",
        showTabBar: false,
        showTopBar: true,
        showLeftArrow: true
      }
    },
    {
      path: '/task',
      name: 'task',
      component: () => import('@/views/TaskListView.vue'),
      meta: {
        title: "任务",
        showTabBar: true,
        showTopBar: true,
        showLeftArrow: false
      }
    },
    {
      path: '/confirm/:taskId',
      name: 'confirm',
      component: () => import('@/views/ConfirmView.vue'),
      meta: {
        title: "确认",
        showTabBar: false,
        showTopBar: true,
        showLeftArrow: true
      }
    },
    {
      path: '/confirmHistory',
      name: 'confirm history',
      component: () => import('@/views/ConfirmHistoryView.vue'),
      meta: {
        title: "确认历史",
        showTabBar: false,
        showTopBar: true,
        showLeftArrow: true
      }
    },
    {
      path: '/confirmDetail/:confirmId',
      name: 'confirm detail',
      component: () => import('@/views/ConfirmDetailView.vue'),
      meta: {
        title: "确认详情",
        showTabBar: false,
        showTopBar: true,
        showLeftArrow: true
      }
    }
  ]
})

// // 路由守卫
// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore();
//
//   // 检查路由元信息是否需要认证
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!userStore) {
//       // 用户未登录，重定向到登录页面
//       next({ name: 'login' });
//     } else {
//       // 用户已登录，允许访问
//       next();
//     }
//   } else {
//     // 对于不需要认证的路由，正常导航
//     next();
//   }
// });

export default router
