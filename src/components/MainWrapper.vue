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
            <form class="d-flex me-auto my-3 my-md-0" id="form">
              <div class="input-group me-3">
                <input class="form-control" type="search" 
                placeholder="Enter the product name" aria-label="Поиск"
                v-model="request"
                v-on:keyup.enter="setSearchRequest(request)">
                <button class="btn btn-secondary" type="button" @click="setSearchRequest(request)">Go!</button>
              </div>
              <div class="btn-group" role="group">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuClickableInside" 
                data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                  Filters
                </button>
                <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <li><h6 class="dropdown-header">Common filters:</h6></li>
                  <li 
                    v-for="(title, index) in commonFilterTitles"
                    :key="index">
                    <button class="dropdown-item" type="button" 
                    :class="filterParams.commonFilterName === title.type ? 'active' : ''"
                    @click="setCommonFilter(title)"
                    >{{ title.name }}</button>
                  </li>
                  <li><hr class="dropdown-divider"></li>
                  <li><h6 class="dropdown-header">Categories filters:</h6></li>
                  <li 
                  v-for="(category, index) in categories"
                    :key="index">
                    <button class="dropdown-item" type="button" 
                    :class="filterParams.categoryName === category ? 'active' : ''"
                    @click="setCategoryFilter(category)"
                    >{{ category }}</button>
                  </li>
                  <li><hr class="dropdown-divider"></li>
                  <li><button class="dropdown-item btn btn-link text-danger rounded-0" type="button"
                    @click="resetFilterParams"
                    >Reset filters</button></li>
                </ul>
              </div>
            </form>
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link :to="{ name: 'catalog'}" class="nav-link"
                :class="$route.path === '/' ? 'active' : ''">
                  <i class="bi bi-house nav-icon"></i>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'cart' }" class="nav-link position-relative">
                  <i class="bi bi-cart4 nav-icon "></i>
                  <span class="position-absolute translate-middle badge rounded-pill bg-danger"
                    v-if="cartTotalQuantity.count > 0">
                    {{ cartTotalQuantity.count }}
                  </span>
                </router-link>
                </li>
              <li class="nav-item">
                <span class="nav-link" style="cursor: pointer;"
                :class="filterParams.isFavoritesOnly && $route.path === '/' ? 'active' : ''"
                @click="toggleFavoritesOnly">
                  <i class="bi bi-star nav-icon"></i>
                </span>
              </li>
                </ul>
          </div>
        </div>
      </nav>
    </header>
    <main class="py-5">
      <div class="container">
        <router-view
          :all_products="allProducts"
        ></router-view>
      </div>
    </main>
  </div>
</template>
  
<script>

import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'v-main-wrapper',
  components: {
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const commonFilterTypes = {
      byNonAlp: 'byNonAlp',
      byAlp: 'byAlp',
      byAscendingPrice: 'byAscendingPrice',
      byDescendingPrice: 'byDescendingPrice'
    };
    const commonFilterTitles = [
      {
        name: 'Expensive first',
        type: commonFilterTypes.byDescendingPrice
      },
      {
        name: 'Cheap first',
        type: commonFilterTypes.byAscendingPrice
      },
      {
        name: 'A - Z',
        type: commonFilterTypes.byAlp
      },
      {
        name: 'Z - A',
        type: commonFilterTypes.byNonAlp
      },
    ];
    let filterParams = ref({
      commonFilterTypes,
      categoryName: '',
      commonFilterName: '',
      searchRequest: '',
      isFavoritesOnly: false
    });
    const setCommonFilter = ((title) =>{
      filterParams.value.commonFilterName = 
        filterParams.value.commonFilterName === title.type ? "" : title.type;
        toCatalog();
    });
    const setCategoryFilter = ((category) =>{
      filterParams.value.categoryName = 
        filterParams.value.categoryName === category ? "" : category;
        toCatalog();
    });
    const setSearchRequest = ((request) =>{
      filterParams.value.searchRequest = request ? request.toLowerCase() : '';
      toCatalog();
    });
    const toggleFavoritesOnly = (() =>{
      filterParams.value.isFavoritesOnly = !filterParams.value.isFavoritesOnly;
      toCatalog();
    });
    const resetFilterParams = (() =>{
      filterParams.value.categoryName = '';
      filterParams.value.commonFilterName = '';
      toCatalog();
    });
    const toCatalog = (() => {
      if(route.path !== '/')
        router.push('/');
    });
    const toFilterProducts = computed(() => {
      let allProducts = store.getters.getAllProducts;

      if (filterParams.value.isFavoritesOnly) {
        allProducts = allProducts.filter((item) => item.isFavorites);
      }

      if (filterParams.value.searchRequest) {
        allProducts = allProducts.filter((item) => {
          return item.title.toLowerCase().includes(filterParams.value.searchRequest)
        });
      }

      if (filterParams.value.categoryName) {
        allProducts = allProducts.filter((item) => {
          return item.category === filterParams.value.categoryName.toLowerCase()
        });
      }

      if (filterParams.value.commonFilterName) {
        allProducts = allProducts.sort((a, b) => {
          if (
            filterParams.value.commonFilterName === commonFilterTypes.byAlp ||
            filterParams.value.commonFilterName === commonFilterTypes.byNonAlp
          ) {
            return a.title.localeCompare(b.title);
          } else {
            return a.price - b.price;
          }
        });

        if (filterParams.value.commonFilterName === commonFilterTypes.byNonAlp ||
        filterParams.value.commonFilterName === commonFilterTypes.byDescendingPrice)
        allProducts.reverse();
      }

      return allProducts;
    });

    const cartTotalQuantity = computed(() => store.getters.GET_CART_TOTAL);
    const categories = computed(() => store.getters.GET_CATEGORIES);

    onMounted(() => {
      store.dispatch('FETCH_CATEGORIES');

      const searchInput = document.querySelector('form input[type="search"]');
      const formElement = document.getElementById('form');
      formElement.addEventListener('submit', (event) => {
        event.preventDefault();
      });

      searchInput.addEventListener('input', () => {
        if (searchInput.value === '') {
          setSearchRequest();
        }
      });
    });

    return {
      commonFilterTitles,
      cartTotalQuantity,
      categories,
      filterParams,
      resetFilterParams,
      allProducts: toFilterProducts,
      setCommonFilter,
      setCategoryFilter,
      setSearchRequest,
      toggleFavoritesOnly,
    }
  }
}
</script>
<style>
.nav-icon {
  margin: auto;
  font-size: 26px;
}</style>