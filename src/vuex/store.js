import { createStore } from 'vuex'


const store = createStore({
  state: {
    allProducts: [], // Состояние для хранения всех товаров
    cart: [], // Состояние для хранения товаров в карзине
    categories: [], // Состояние для хранения категорий товаров
    product: {}, // Состояние для хранения товара по id
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setAllProducts(state, allProducts) {
      state.allProducts = allProducts.map((product) =>{
        product['quantity'] = 0;
        product['isFavorites'] = localStorage[product.id] === 'true';
        return product;
      });
    },
    setProduct(state, product){
      state.product = product;
    },
    destroyProduct(state){
      state.product = {};
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
      state.cart.splice(id, 1);
    },
    INCREMENT_CART: (state, id) =>{
      state.cart[id].quantity++;
    },
    DECREMENT_CART: (state, id) =>{
      state.cart[id].quantity--;

      if(state.cart[id].quantity <= 0){
        state.cart.splice(id, 1);
      }
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
          console.log(product.isFavorites)
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
    // async fetchProducts({ commit }) {
    //   try {
    //     const response = await fetch('https://fakestoreapi.com/products?limit=10');
    //     const products = await response.json();
    //     commit('setProducts', products);
    //   } catch (error) {
    //     console.error('Ошибка при получении всех товаров:', error);
    //   }
    // },
    // async fetchNextProducts({ commit, state }) {
    //     try {
    //       const offset = state.allProducts.length;
    //       const response = await fetch(`https://fakestoreapi.com/products?limit=10&offset=${offset}`);
    //       const nextProducts = await response.json();
    //       const updatedProducts = [...state.allProducts, ...nextProducts];
    //       commit('setAllProducts', updatedProducts);
    //     } catch (error) {
    //       console.error('Ошибка при получении следующих товаров:', error);
    //     }
    // },
    async fetchProductById({ commit }, id) {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const product = await response.json();
        commit('setProduct', product);
      } catch (error) {
        console.error(`Ошибка при получении товара имеющего id:${id}:`, error);
      }
    },
    ADD_TO_CART({commit}, product){
      commit('SET_CART', product.data);
    },
    DELETE_CART_ITEM({commit}, id){
      commit('REMOVE_CART', id);
    },
  },
  getters: {
    getProductById: (state) => {
      return state.product;
    },
    getAllProducts: (state) => {
      return state.allProducts;
    },
    GET_CART(state){
      return state.cart;
    },
    GET_CART_TOTAL(state){
      let count = 0;
      let sum = 0;
      state.cart.map((item) => {
        count += item.quantity;
        sum += item.quantity * item.price;
      })
      return {count, sum};
    },
    GET_CATEGORIES(state){
      return state.categories;
    }
  }
});

export default store;