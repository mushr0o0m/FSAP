import { createStore } from 'vuex'


const store = createStore({
  state: {
    products: [], // Состояние для хранения товаров
    allProducts: [], // Состояние для хранения всех товаров
    cart: [] // Состояние для хранения товаров в карзине
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setAllProducts(state, allProducts) {
      state.allProducts = allProducts;
    },
    SET_CART: (state, product) => {
      state.cart.push(product);
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        commit('setProducts', products);
      } catch (error) {
        console.error('Ошибка при получении товаров:', error);
      }
    },
    async fetchAllProducts({ commit }) {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=10');
        const allProducts = await response.json();
        commit('setAllProducts', allProducts);
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
      commit('SET_CART', product)
    }
  },
  getters: {
    getProductById: (state) => (id) => {
      return state.products.find((product) => product.id === id);
    },
    getAllProducts: (state) => {
      return state.allProducts;
    },
    CART(state){
      return state.cart;
    }
  }
});

export default store;