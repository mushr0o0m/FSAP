<template>
    <div class="v-catalog row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <catalog-item 
        v-for="product in all_products"
         :key="product.id"
         :product_data="product"
         @addToCart = "addToCart"
         @toggleFavorite = "toggleFavorite"
         @decremntCart = "decremntCart"
         @incremntCart = "incremntCart"
        />
    </div>
</template>
  
<script>
import CatalogItem from '@/components/CatalogItem.vue'
import { useStore } from 'vuex';
import { onMounted } from 'vue';

export default {
    name: 'v-catalog',
    components: {
        CatalogItem
    },
    props: {
        all_products: {
        type: Object,
        default() {
            return {}
        }
    }
    },
    setup() {
        const store = useStore();
        onMounted(() => {
            store.dispatch('fetchAllProducts');
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

        return {
         addToCart,
         toggleFavorite,
         incremntCart,
         decremntCart
        };
    }
};
</script>
  
