import { createStore } from 'vuex'


const store = createStore({
  state: {
    products: [], // Состояние для хранения товаров
    allProducts: [], // Состояние для хранения всех товаров
    cart: [], // Состояние для хранения товаров в карзине
    categories: [], // Состояние для хранения категорий товаров
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setAllProducts(state, allProducts) {
      state.allProducts = allProducts;
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
            item.quantity++
          }
        });
        if (!isProductExists){
          state.cart.push(product);
        }
      } else {
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
    async fetchProducts({ commit }) {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=10');
        const products = await response.json();
        commit('setProducts', products);
      } catch (error) {
        console.error('Ошибка при получении всех товаров:', error);
      }
    },
    async fetchNextProducts({ commit, state }) {
        try {
          const offset = state.allProducts.length;
          const response = await fetch(`https://fakestoreapi.com/products?limit=10&offset=${offset}`);
          const nextProducts = await response.json();
          const updatedProducts = [...state.allProducts, ...nextProducts];
          commit('setAllProducts', updatedProducts);
        } catch (error) {
          console.error('Ошибка при получении следующих товаров:', error);
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
    getProductById: (state) => (id) => {
      return state.products.find((product) => product.id === id);
    },
    getAllProducts: (state) => {
      return state.allProducts;
    },
    GET_CART(state){
      return state.cart;
    },
    GET_CART_TOTAL_QUANTITY(state){
      let count = 0;
      state.cart.map((item) => {
        count += item.quantity;
      })
      return count;
    },
    GET_CATEGORIES(state){
      return state.categories;
    }
  }
});

export default store;