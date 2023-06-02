import { createStore } from 'vuex'


const store = createStore({
  state: {
    allProducts: [], // Состояние для хранения всех товаров
    cart: [], // Состояние для хранения товаров в карзине
    categories: [], // Состояние для хранения категорий товаров
    itemsPerPage: 5,
  },
  mutations: {
    setAllProducts(state, allProducts) {
      state.allProducts = allProducts.map((product) =>{
        product['quantity'] = product.quantity || 0;
        product['isFavorites'] = localStorage[product.id] === 'true';
        return product;
      });
    },
    setCategories(state, categories) {
      state.categories = categories.map((x) => x[0].toUpperCase() + x.slice(1).toLowerCase());
    },
    SET_CART: (state, product) => {
      if (state.cart.length){
        let isProductExists = false;
        state.cart.map((item) => {
          if(item.id === product.id){
            isProductExists = true;
            item.quantity++;
          }
        });
        if (!isProductExists){
          product.quantity = 1;
          state.cart.push(product);
        }
      } else {
        product.quantity = 1;
        state.cart.push(product);
      }
    },
    REMOVE_CART: (state, id) =>{
      state.cart.forEach((cartItem, index) => {
        if(cartItem.id === id){
          state.cart.splice(index, 1);
        }
      });
    },
    INCREMENT_CART: (state, id) =>{
      state.cart.forEach((cartItem) => {
        if(cartItem.id === id){
          cartItem.quantity++;
        }
      });
    },
    DECREMENT_CART: (state, id) =>{
      state.cart.forEach((cartItem, index) => {
        if(cartItem.id === id){
          cartItem.quantity--;
          if(cartItem.quantity <= 0){
            state.cart.splice(index, 1);
          }
        }
      });
    },
    SAVE_FAVORITES_TO_LOCAL(state){
      state.allProducts.map((product) => {
        localStorage[product.id] = product.isFavorites;
      });
    },
    SET_FAVORITES(state, id){
      state.allProducts.map((product) => {
        if (product.id === id){
          product.isFavorites = !product.isFavorites;
        }
      });
    }
  },
  actions: {
    async FETCH_CATEGORIES({ commit }) { 
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const categories = await response.json();
        commit('setCategories', categories);
      } catch (error) {
        console.error('Ошибка при получении категорий:', error);
      }
    },
    async fetchAllProducts({ commit }) { 
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const allProducts = await response.json();
        commit('setAllProducts', allProducts);
      } catch (error) {
        console.error('Ошибка при получении товаров:', error);
      }
    },
    ADD_TO_CART({commit}, product){
      commit('SET_CART', product.data);
    },
    ADD_TO_FAVORITES({commit}, id){
      commit('SET_FAVORITES', id);
      commit('SAVE_FAVORITES_TO_LOCAL');
    }
  },
  getters: {
    getProductById: (state) => (id) => {
      console.log(state.allProducts)
      return state.allProducts.find((product) => product.id === id);
    },
    getAllProducts: (state) => {
      return state.allProducts;
    },
    GET_CART: (state) =>{
      return state.cart;
    },
    GET_CART_TOTAL: (state) =>{
      let count = 0;
      let sum = 0;
      state.cart.map((item) => {
        count += item.quantity;
        sum += item.quantity * item.price;
      })
      return {count, sum};
    },
    GET_CATEGORIES: (state) =>{
      return state.categories;
    },
    GET_PRODUCT_CART: (state) => (id) => {
      const cartItem = state.cart.filter((cartItem) => {
        return id === cartItem.id;
      });
      return cartItem[0];
    },
    GET_ITEMS_PER_PAGE: (state) =>{
      return state.itemsPerPage;
    },
  }
});

export default store;