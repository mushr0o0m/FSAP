<template>
  <div class="v-catalog-item-page">
    <div v-if="!product" 
      class="alert alert-warning" role="alert">
          Loading...
    </div>
    <div class="row text-start" v-if="product">
      <h1 class="mb-3 text-primary col-12">{{ product.title }}</h1>
    <div class="col-12 col-md-4 d-flex justify-content-center">
      <img class="bd-placeholder-img card-img-top mb-3 object-fit-contain mw-md-50" :src="product.image"
        @load="onImageLoad">
      <h3 v-if="isImageLoading" class="text-center image-placeholder">Loading...</h3>
    </div>
    <div class="col-12 col-md-4">
      <h4>Product description:</h4>
      <p>{{ product.description }}</p>
      <hr class="my-2">
      <h4>Category: </h4>
      <p>{{ product.category }}</p>
    </div>
    <div class="col-12 col-md-4 d-flex flex-column align-items-center">
      <div class="mb-3 text-center">
        <h2 class="card-title pricing-card-title mb-1">{{ product.price }} $</h2>
        <span v-if="product.rating?.rate" class="text-mute">{{ product.rating?.rate }}/5 {{ product.rating?.count
        }} reviews</span>
      </div>
      <div>
        <button class="btn btn-lg btn-outline-primary me-3"
        v-if="!cartItem"
        @click="addToCart">Add to cart</button>
        <cart-btn-group
          class="d-inline-block btn-group-lg me-3"
          :cart_item="cartItem"
          v-if="cartItem"
          @decremntCart="decremntCart"
          @incremntCart="incremntCart"
        />
        <button 
          class="btn btn-lg btn-outline-primary" 
          data-bs-toggle="button"
          :class="product.isFavorites ? 'active' : ''"
          @click="toggleFavorite"
        >
          <i class="bi bi-star-fill"></i>
        </button>
      </div>
    </div>
    </div>
  </div>
</template>
  
<script>

import CartBtnGroup from '@/components/CartBtnGroup.vue'
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { computed, ref, onBeforeMount } from 'vue';

export default {
  name: 'v-catalog-item-page',
  components: {
    CartBtnGroup
  },
  props: {
    id: {
      type: String,
      default() {
        return '0';
      }
    }
  },
  data() {
    return {}
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const id = Number(route.params.id);
    const isImageLoading = ref(true);
    
    onBeforeMount(() => {
      console.log('hi')
      store.dispatch('fetchAllProducts');
    });
    const product = computed(() => store.getters.getProductById(id));
    const onImageLoad = () => {
      isImageLoading.value = false;
    };

    const addToCart = (() => {
      store.dispatch('ADD_TO_CART', { data: product.value });
    });

    const cartItem = computed(() =>
     store.getters.GET_PRODUCT_CART(id));

    const incremntCart = (() => {
      store.commit('INCREMENT_CART', id);
    });
    const decremntCart = (() => {
      store.commit('DECREMENT_CART', id);
    });
    const toggleFavorite = (() => {
        store.dispatch('ADD_TO_FAVORITES', id);
    });

    return {
      product,
      onImageLoad,
      isImageLoading,
      cartItem,
      addToCart,
      incremntCart,
      decremntCart,
      toggleFavorite,
    }
  },
}
</script>
<style scoped>
img {
  object-fit: contain;
  max-height: 300px;
}
</style>