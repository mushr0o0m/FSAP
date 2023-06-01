<template>
    <div class="v-cart">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">Your cart</span>
            <span class="badge bg-primary rounded-pill"
            v-if="cartTotalQuantity.count > 0"
            >{{ cartTotalQuantity.count }}</span>
        </h4>
        <div v-if="cartTotalQuantity.count === 0" 
        class="alert alert-primary" role="alert">
            Your cart is empty! Go shopping!
        </div>
        <ul class="list-group mb-3">
            <cart-item
                v-for="cartItem in cartList" 
                :key="cartItem.id"
                :cart_item="cartItem"
                @deleteFromCart="deleteFromCart"
                @decremntCart="decremntCart"
                @incremntCart="incremntCart"
            />
            <li class="list-group-item d-flex justify-content-between"
            v-if="cartTotalQuantity.count > 0">
                <span>Total (USD)</span>
                <strong>{{ cartTotalQuantity.sum.toFixed(2) }}$</strong>
            </li>
        </ul>
    </div>
</template>
    
<script>
import CartItem from '@/components/CartItem.vue'
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'v-cart',
    components: {
        CartItem
    },
    setup(){
        const store = useStore();
        const cartList = computed(() => store.getters.GET_CART);
        const cartTotalQuantity = computed(() => store.getters.GET_CART_TOTAL);
        const deleteFromCart = ((id) => {
            store.commit('REMOVE_CART', id);
        });
        const incremntCart = ((id) => {
            store.commit('INCREMENT_CART', id);
        });
        const decremntCart = ((id) => {
            store.commit('DECREMENT_CART', id);
        });
        
        return{
            cartList,
            cartTotalQuantity,
            deleteFromCart,
            incremntCart,
            decremntCart,
        }
    }
}
</script>
<style></style>