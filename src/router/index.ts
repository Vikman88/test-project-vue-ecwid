import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import ProductPage from '@/views/ProductPage.vue'
import CartPage from '@/views/CartPage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/products/:id',
    name: 'ProductPage',
    component: ProductPage
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
