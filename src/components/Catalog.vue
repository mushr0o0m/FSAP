<template>
    <div class="v-catalog row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <catalog-item 
        v-for="product in products"
         :key="product.id"
         :product_data="product"
         @addToCart = "addToCart"
        />
    </div>
</template>
  
<script>
import CatalogItem from '@/components/CatalogItem.vue'
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'v-catalog',
    components: {
        CatalogItem
    },
    setup() {
        const store = useStore();
        const allProducts = computed(() => store.getters.getAllProducts);

        onMounted(() => {
            store.dispatch('fetchAllProducts');
        });

        const addToCart = ((data) =>{
            store.dispatch('ADD_TO_CART', {
                data
            });
        });

        return {
         products: allProducts,
         addToCart,
        };
    }
};
</script>
  
