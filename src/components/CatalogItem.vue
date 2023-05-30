<template>
  <div class="v-catalog-item col">
    <div class="card shadow-sm h-100">
      <a class="card__link" href="#"></a>
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
          >Add to cart</button>
          <button class="btn btn-lg btn-outline-primary" data-bs-toggle="button">
            <i class="bi bi-star-fill"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>

import { toRef } from 'vue';

export default {
  name: 'v-catalog-item',
  components: {
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
    const product_item = toRef(props, 'product_data');

    const setQuantity = () => {
      product_item.value['quantity'] = 1;
    };

    // onMounted(() => {
    //   setQuantity();
    // })

    const addToCart = (() => {
      setQuantity();
      context.emit('addToCart', props.product_data)
    })

    return{
      addToCart,
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