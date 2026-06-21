import { createRouter, createWebHistory } from 'vue-router';
import AdminLayout from '../layouts/AdminLayout.vue';
import LoginLayout from '../layouts/LoginLayout.vue';
import Login from '../pages/Login.vue';
import Dashboard from '../pages/Dashboard.vue';
import HocVien from '../pages/HocVien.vue';
import GiaoVien from '../pages/GiaoVien.vue';
import XeTapLai from '../pages/XeTapLai.vue';
import ChuongTrinhHoc from '../pages/ChuongTrinhHoc.vue';
import PhongHoc from '../pages/PhongHoc.vue';
import HoSoHocVien from '../pages/HoSoHocVien.vue';
import ThiSatHach from '../pages/ThiSatHach.vue';
import TraGPLX from '../pages/TraGPLX.vue';
import TaiKhoan from '../pages/TaiKhoan.vue';

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/login',
    component: LoginLayout,
    children: [
      {
        path: '',
        name: 'Login',
        component: Login,
      },
    ],
  },
  {
    path: '/',
    component: AdminLayout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'hoc-vien',
        name: 'HocVien',
        component: HocVien,
      },
      {
        path: 'giao-vien',
        name: 'GiaoVien',
        component: GiaoVien,
      },
      {
        path: 'xe-tap-lai',
        name: 'XeTapLai',
        component: XeTapLai,
      },
      {
        path: 'chuong-trinh-hoc',
        name: 'ChuongTrinhHoc',
        component: ChuongTrinhHoc,
      },
      {
        path: 'phong-hoc',
        name: 'PhongHoc',
        component: PhongHoc,
      },
      {
        path: 'ho-so-hoc-vien',
        name: 'HoSoHocVien',
        component: HoSoHocVien,
      },
      {
        path: 'thi-sat-hach',
        name: 'ThiSatHach',
        component: ThiSatHach,
      },
      {
        path: 'tra-gplx',
        name: 'TraGPLX',
        component: TraGPLX,
      },
      {
        path: 'tai-khoan',
        name: 'TaiKhoan',
        component: TaiKhoan,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  // TODO: Add authentication check
  // const isAuthenticated = !!localStorage.getItem('token');
  // if (to.path !== '/login' && !isAuthenticated) {
  //   next('/login');
  // } else {
  //   next();
  // }
  next();
});

export default router;
