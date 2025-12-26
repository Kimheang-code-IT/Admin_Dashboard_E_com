import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPasswordView.vue')
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('../views/CategoryView.vue')
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('../views/ProductView.vue')
  },
  {
    path: '/pos',
    name: 'Pos',
    component: () => import('../views/PosView.vue')
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('../views/ReportView.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/UserView.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/HistoryView.vue')
  },
  {
    path: '/tax',
    name: 'Tax',
    component: () => import('../views/TaxView.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/OrderView.vue')
  },
  {
    path: '/financial',
    name: 'Financial',
    component: () => import('../views/FinancialView.vue')
  },
  {
    path: '/invoice/:cartData?',
    name: 'Invoice',
    component: () => import('../views/InvoiceView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

