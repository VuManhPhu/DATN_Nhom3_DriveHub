import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/Dashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/tai-khoan',
    name: 'TaiKhoan',
    component: () => import('@/pages/TaiKhoan.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/thi-sat-hach',
    name: 'ThiSatHach',
    component: () => import('@/pages/ThiSatHach.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/tra-gplx',
    name: 'TraGPLX',
    component: () => import('@/pages/TraGPLX.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = localStorage.getItem('auth')
  const isAuthenticated = auth ? JSON.parse(auth).isAuthenticated : false

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
