<template>
    <div class="v-catalog">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mb-5">
        <catalog-item 
            v-for="product in all_products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)"
            :key="product.id"
            :product_data="product"
            @addToCart = "addToCart"
            @toggleFavorite = "toggleFavorite"
            @decremntCart = "decremntCart"
            @incremntCart = "incremntCart"
        />
        </div>
        <nav class="d-flex justify-content-center" aria-label="Pagination" 
            v-if="(currentPage - 1) * itemsPerPage < all_products.length">
            <ul class="pagination pagination-lg">
                <li class="page-item">
                    <button 
                        class="page-link" 
                        :class="currentPage === 1 ? 'disabled' : ''"
                        @click="decremntPage"
                    >Previous</button>
                </li>
                <li class="page-item">
                    <button 
                        class="page-link" 
                        :class="currentPage * itemsPerPage >= all_products.length ? 'disabled' : ''"
                        @click="incremntPage"
                    >Next</button>
                </li>
            </ul>
        </nav>
        <div v-if="(currentPage - 1) * itemsPerPage >= all_products.length"
        class="alert alert-warning" role="alert">
            <h5>We couldn't find anything.</h5>
            <p>You seem to have invented a new product. We don't have it yet, but there are 20 of others!</p>
        </div>
    </div>
</template>
  
<script>
import CatalogItem from '@/components/CatalogItem.vue'
import { useStore } from 'vuex';
import { onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    name: 'v-catalog',
    components: {
        CatalogItem
    },
    props: {
        all_products: {
            type: Array,
            default() {
                return []
            },
        }
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        onMounted(() => {
            store.dispatch('FETCH_ALL_PRODUCTS');
        });
        const addToCart = ((data) =>{
            store.dispatch('ADD_TO_CART', {
                data
            });
        });

        const incremntCart = ((data) => {
            store.commit('INCREMENT_CART', data.id);
        });
        const decremntCart = ((data) => {
            store.commit('DECREMENT_CART', data.id);
        });

        const toggleFavorite = ((data) => 
            store.dispatch('ADD_TO_FAVORITES', data.id));
        
        const itemsPerPage = computed(() => store.getters.GET_ITEMS_PER_PAGE);


        const incremntPage = (() => {
            updatePageInUrl(currentPage.value + 1);
        });

        const decremntPage = (() => {
            updatePageInUrl(currentPage.value - 1);
        });

        const currentPage = computed(() => {
            const page = Number(route.params.page);
            return Number.isInteger(page) && page > 0 ? page : 1;
        });

        const updatePageInUrl = (page) => {
            router.replace({ params: { page: page.toString() } });
        };

        updatePageInUrl(currentPage.value);

        return {
            itemsPerPage,
            currentPage,
            incremntPage,
            decremntPage,
            addToCart,
            toggleFavorite,
            incremntCart,
            decremntCart
        };
    }
};
</script>
  
