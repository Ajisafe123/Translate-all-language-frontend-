import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '../views/signup.vue'
import Login from '@/views/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/signup',
      name: 'Signup',
      component: SignupView,
    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    },
  ],
})

export default router
