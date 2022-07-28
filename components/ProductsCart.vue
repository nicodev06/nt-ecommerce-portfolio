<template>
<div class="cart-wrapper">
    <div class="cart-container">
    <button
    type="button"
    class="cart-heading"
    >
    <i class="pi pi-angle-left" @click="changeCartState"></i>
    <span class="heading">Your Cart</span>
    <span class="cart-num-items">({{$store.state.totalQuantities}} items)</span>
    </button>
    <div v-if="$store.state.cartItems.length < 1">
        <div class="empty-cart">
            <i class="pi pi-shopping-bag"></i>
            <h3>Your shopping bag is empty</h3>
            <NuxtLink to="/">
                <button
                type="button"
                class="btn"
                @click="changeCartState"
                >
                Continue shopping    
                </button>
            </NuxtLink>
        </div>
    </div>
    <div class="product-container">
        <div v-for="product in $store.state.cartItems" :key="product._id" class="product">
            <img :src="urlFor(product.image[0])" class="cart-product-image" alt="Immagine non disponibile">
            <div class="item-desc">
                <div class="flex top">
                    <h5>{{product.name}}</h5>
                    <h4>${{product.price}}</h4>
                </div>
                <div class="flex bottom">
                    <div>
                        <p class="quantity-desc">
                        <span class="minus">
                            <i class="pi pi-minus" @click="upgradeProductQty(product._id, -1)"></i>
                        </span>
                            <span class="num">
                                {{product.quantity}}
                        </span>
                        <span class="plus">
                            <i class="pi pi-plus" @click="upgradeProductQty(product._id, 1)"></i>
                        </span>
                        </p>
                    </div>
                    <i class="pi pi-times remove-item" @click="remove(product._id)"></i>
                </div>
            </div>
        </div>
    </div>
    <div v-if="$store.state.cartItems.length >= 1" class="cart-bottom">
        <div class="total">
            <h3>Subtotal:</h3>
            <h3>${{$store.state.totalPrice}}</h3>
        </div>
        <div class="btn-container">
            <button
            type="button"
            class="btn"
            @click="handleCheckout"
            >
            Pay with Stripe
            </button>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import { urlFor } from '../ecommercesanity/lib/client';
import getStripe from '../ecommercesanity/lib/getStripe';
export default {
    name: 'ProductsCart',
    methods: {
        changeCartState(){
            this.$store.commit('changeCartState');
        },
        urlFor,
        upgradeProductQty(id, n){
            this.$store.commit('upgradeProductQty', [id,n]);
        },
        remove(id){
            this.$store.commit('onRemove', id);
        },
        async handleCheckout(){
            const url =  'https://stripe-server-nt.herokuapp.com/create-checkout-session';
            const stripe = await getStripe();
            const items = this.$store.state.cartItems;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    },
                body: JSON.stringify(items)
            });
            if(response.statusCode === 500) return;
            const data = await response.json();
            console.log(data.id);
            stripe.redirectToCheckout({ sessionId: data.id });
            }
        }
}
</script>
