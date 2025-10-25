import { createRouter, createWebHistory } from 'vue-router'
import PoliticianList from '../views/PoliticianList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PoliticianList,
    },
    {
      path: '/politician/:id',
      name: 'politician-detail',
      component: () => import('../views/PoliticianDetail.vue'),
    },
    {
      path: '/add-politician',
      name: 'add-politician',
      component: () => import('../views/AddPolitician.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue'),
    },
  ],
})

export default router
