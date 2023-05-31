<template>
    <div class="v-catalog row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <catalog-item 
        v-for="product in all_products"
         :key="product.id"
         :product_data="product"
         @addToCart = "addToCart"
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
            console.log(data)
            store.dispatch('ADD_TO_CART', {
                data
            });
        });

        return {
         addToCart,
        };
    }
};
</script>
  
