import { createRouter, createWebHistory } from 'vue-router';
import Catalog from '@/components/Catalog.vue';
import Cart from '@/components/Cart.vue';
import CatalogItemPage from '@/components/CatalogItemPage.vue';

const routes = [
  {
    path: '/',
    name: 'catalog',
    component: Catalog,
    props: true,
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
  },
  {
    path: '/catalog/:id',
    name: 'catalogItemPage',
    component: CatalogItemPage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;