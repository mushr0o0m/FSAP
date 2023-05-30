import { createRouter, createWebHistory } from 'vue-router';
import Catalog from '@/components/Catalog.vue';
import Cart from '@/components/Cart.vue';

const routes = [
  {
    path: '/',
    name: 'catalog',
    component: Catalog,
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;