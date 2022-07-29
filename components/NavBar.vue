<template>
    <div class="navbar-container">
        <p class="logo">
           NT Headphones
        </p>
        <button
        type="button"
        class="cart-icon">
            <i class="pi pi-shopping-bag" @click="changeCartState"></i>
            <span class="cart-item-qty">{{$store.state.totalQuantities}}</span>
        </button>
        <ProductsCart v-if="$store.state.showCart"/>
    </div>
</template>

<script>
import 'primeicons/primeicons.css';
export default {
    name: 'NavBar',
    methods: {
        changeCartState(){
            this.$store.commit('changeCartState');
        }
    }
}
</script>
