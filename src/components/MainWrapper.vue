<template>
  <div class="v-main-wrapper">
    <header class="mb-5">
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="https://fakestoreapi.com/">Fake Api Store</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse" aria-expanded="false" aria-label="Переключить навигацию">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <form class="d-flex me-auto my-3 my-md-0">
              <div class="input-group me-3">
                <input class="form-control" type="search" placeholder="Enter the product name" aria-label="Поиск">
                <button class="btn btn-secondary" type="submit">Go!</button>
              </div>
              <div class="btn-group" role="group">
                <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  Filters
                </button>
                <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <li><button class="dropdown-item">Expensive first</button></li>
                  <li><button class="dropdown-item">Cheap first</button></li>
                  <li><button class="dropdown-item">A - Z</button></li>
                  <li><button class="dropdown-item">Z - A</button></li>
                  <li>
                    <hr class="dropdown-divider">
                  </li>
                  <li 
                    v-for="(category, index) in categories"
                    :key="index">
                    <button class="dropdown-item">{{ category }}</button>
                  </li>
                </ul>
              </div>
            </form>
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link :to="{ name: 'catalog' }" class="nav-link">
                  <i class="bi bi-house nav-icon"></i>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'cart' }" class="nav-link position-relative">
                  <i class="bi bi-cart4 nav-icon "></i>
                  <span class="position-absolute translate-middle badge rounded-pill bg-danger"
                    v-if="cartTotalQuantity > 0">
                    {{ cartTotalQuantity }}
                  </span>
                </router-link>
              </li>
              <!-- <li class="nav-item">
            <router-link :to="{name: 'catalog'}" class="nav-link">
              <i class="bi bi-star nav-icon"></i>
            </router-link>
          </li> -->
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <main class="py-5">
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>
  
<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'v-main-wrapper',
  components: {
  },
  setup() {
    const store = useStore();
    const cartTotalQuantity = computed(() => store.getters.GET_CART_TOTAL_QUANTITY);
    const categories = computed(() => store.getters.GET_CATEGORIES);
    onMounted(() => {
      store.dispatch('FETCH_CATEGORIES');
    });

    return {
      cartTotalQuantity,
      categories,
    }
  }
}
</script>
<style>
.nav-icon {
  margin: auto;
  font-size: 26px;
}</style>