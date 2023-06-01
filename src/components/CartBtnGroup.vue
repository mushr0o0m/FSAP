<template>
    <div class="btn-group" role="group">
        <button type="button" class="btn btn-outline-primary" @click="decremntCart">
            <i class="bi bi-dash"></i>
        </button>
        <span class="btn btn-outline-primary">{{ cart_item.quantity }}</span>
        <button type="button" class="btn btn-outline-primary" @click="incremntCart">
            <i class="bi bi-plus"></i>
        </button>
    </div>
</template>
<script>

export default {
    name: 'v-cart-btn-group',
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
        const decremntCart = (() => {
            context.emit('decremntCart');
        });
        const incremntCart = (() => {
            context.emit('incremntCart');
        });

        return {
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