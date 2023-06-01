<template>
  <div class="v-catalog-item col">
    <div class="card shadow-sm h-100">
      <router-link class="card__link"
       :to="{
        name: 'catalogItemPage',
        path: `/catalog/${product_data.id}`,
        params: { id:product_data.id},
        }">
      </router-link>
      <div class="card-header">
        <h4 class="my-0 font-weight-normal">{{ product_data.title }}</h4>
      </div>
      <div class="card-body d-flex flex-column justify-content-between">
        <img class="bd-placeholder-img card-img-top mb-3" :src="product_data.image" alt="">
        <div>
          <h2 class="card-title pricing-card-title">{{ product_data.price }} $</h2>
          <button 
          class="btn btn-lg btn-block btn-outline-primary me-2" 
          @click="addToCart"
          v-if="product_data.quantity === 0"
          >Add to cart</button>
          <cart-btn-group
          class="d-inline-block btn-group-lg me-2"
          :cart_item="product_data"
          v-if="product_data.quantity > 0"
          @decremntCart="decremntCart"
          @incremntCart="incremntCart"/>
          <button class="btn btn-lg btn-outline-primary" data-bs-toggle="button"
          :class="product_data.isFavorites ? 'active' : ''"
          @click="toggleFavorite">
            <i class="bi bi-star-fill"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>

import CartBtnGroup from '@/components/CartBtnGroup.vue'

export default {
  name: 'v-catalog-item',
  components: {
    CartBtnGroup
  },

  props: {
    product_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  setup(props, context){

    const addToCart = (() => {
      context.emit('addToCart', props.product_data);
    });

    const toggleFavorite = (() =>{
      context.emit('toggleFavorite', props.product_data);
    });
    
    const decremntCart = (() => {
        context.emit('decremntCart', props.product_data);
    });
    const incremntCart = (() => {
        context.emit('incremntCart', props.product_data);
    });

    return{
      addToCart,
      toggleFavorite,
      incremntCart,
      decremntCart,
    };
  },
} 
</script>
<style scoped>
img {
  max-height: 150px;
  object-fit: contain;
}

.card {
  position: relative;
}

.card__link {
  display: contents;
}

.card__link::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80%;
}
</style>