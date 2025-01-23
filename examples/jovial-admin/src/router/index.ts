import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        component: () => import('../pages/Dashboard.vue'),
      },
      // {
      //   path: 'analytics',
      //   component: () => import('../pages/Analytics.vue'),
      // },
      // {
      //   path: 'users',
      //   component: () => import('../pages/Users.vue'),
      // },
      // {
      //   path: 'roles',
      //   component: () => import('../pages/Roles.vue'),
      // },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
