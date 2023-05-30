import { createApp } from 'vue'
import App from './App.vue'
import store from './vuex/store'
import route from './router/router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import "bootstrap"

createApp(App)
    .use(store)
    .use(route)
    .mount('#app');