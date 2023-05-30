<template>
    <li class="v-cart-item list-group-item d-flex lh-sm ">
        <img class="bd-placeholder-img me-3" :src="cart_item.image"
            style="width: 100px; height: 100px; object-fit: contain;">
        <div class="d-flex row row-cols-1 w-100 g-3">
            <div class="d-flex col justify-content-between">
                <div class="text-start">
                    <h5 class="my-0">{{ cart_item.title }}</h5>
                    <small class="text-muted">{{ cart_item.category }}</small>
                </div>
                <h5 class="my-0">{{ cart_item.price }}$</h5>
            </div>
            <div class="control d-flex justify-content-end col ms-auto">
                <div class="btn-group me-3" role="group">
                    <button type="button" class="btn btn-outline-primary" @click="decremntCart">
                        <i class="bi bi-dash"></i>
                    </button>
                    <span class="btn btn-outline-primary">{{ cart_item.quantity }}</span>
                    <button type="button" class="btn btn-outline-primary" @click="incremntCart">
                        <i class="bi bi-plus"></i>
                    </button>
                </div>
                <button type="button" class="btn btn-outline-danger" @click="deleteFromCart">
                    Delete
                </button>
            </div>
        </div>
    </li>
</template>
    
<script>


export default {
    name: 'v-cart-item',
    components: {
    },
    data() {
        return {}
    },
    props: {
        cart_item: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    setup(props, context) {
        const deleteFromCart = (() => {
            context.emit('deleteFromCart');
        });
        const decremntCart = (() => {
            context.emit('decremntCart');
        });
        const incremntCart = (() => {
            context.emit('incremntCart');
        });

        return{
            deleteFromCart,
            decremntCart,
            incremntCart
        };
    }
}
</script>

<style scoped>
.btn-group {
    display: block;
    font-size: 16px;
}

span.btn-outline-primary:hover {
    color: var(--bs-btn-color);
    background-color: var(--bs-btn-hover-color) !important;
    cursor: default;
}
</style>