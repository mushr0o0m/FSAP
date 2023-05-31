<template>
  <div class="v-catalog-item-page row text-start">
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
        <span v-if="product.rating?.rate" class="text-mute">{{ product.rating?.rate }}/5 ({{ product.rating?.count
        }})</span>
      </div>
      <div>
        <button class="btn btn-lg btn-outline-primary me-3" @click="addToCart">Add to cart</button>
        <button class="btn btn-lg btn-outline-primary" data-bs-toggle="button">
          <i class="bi bi-star-fill"></i>
        </button>
      </div>
    </div>
  </div>
</template>
  
<script>

import { useStore } from 'vuex';
import { onBeforeMount, computed, onUnmounted, ref } from 'vue';

export default {
  name: 'v-catalog-item-page',
  components: {
  },
  props: {
    id: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {}
  },
  setup(props) {
    const store = useStore();
    const isImageLoading = ref(true);

    onBeforeMount(() => {
      store.dispatch('fetchProductById', props.id);
    });
    onUnmounted(() => {
      store.commit('destroyProduct');
    });

    const product = computed(() => store.getters.getProductById);
    const onImageLoad = () => {
      isImageLoading.value = false;
    };

    const setQuantity = () => {
      product.value['quantity'] = 1;
    };
    const addToCart = (() => {
      setQuantity();
      store.dispatch('ADD_TO_CART', {data: product.value});
    });

    return {
      product,
      onImageLoad,
      isImageLoading,
      addToCart
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