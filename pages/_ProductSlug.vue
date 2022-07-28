<template>
<div class="app">
<NavBar/>
<div class="product-detail-container" v-if="product">
  <div>
    <div class="product-image">
      <img :src="urlFor(product.image[imageIndex])" alt="Immagine non disponibile" class="product-detail-image">
    </div>
    <div class="small-images-container">
      <div v-for="(item, index) in product.image" :key="index">
        <img 
        :src="urlFor(item)"
        @mouseenter="imageIndex = index"
        :class="[index === imageIndex ? 'selected-image' : '', 'small-image']">
      </div>
    </div>
  </div>
  <div class="product-detail-desc">
    <h1>{{product.name}}</h1>
    <div class="reviews">
      <i class="pi pi-star-fill"></i>
      <i class="pi pi-star-fill"></i>
      <i class="pi pi-star-fill"></i>
      <i class="pi pi-star-fill"></i>
      <i class="pi pi-star-fill"></i>
      <p>(16)</p>
    </div>
    <h4>Details</h4>
    <p>{{product.details}}</p>
    <p class="price">${{product.price}}</p>
    <div class="quantity">
      <p class="quantity-desc">
        <span class="minus">
          <i class="pi pi-minus" @click="decQty"></i>
        </span>
        <span class="num">
          {{quantity}}
        </span>
        <span class="plus" @click="incQty">
          <i class="pi pi-plus"></i>
        </span>
      </p>
    </div>
    <div class="buttons">
      <button
      type="button"
      class="add-to-cart"
      @click="onAdd"
      >
      Add to Cart
      </button>
      <button
      type="button"
      class="buy-now"
      @click="buyNow"
      >
      Buy Now
      </button>
    </div>
  </div>
</div>
<div class="maylike-products-wrapper">
  <h2>You may Also Like</h2>
  <div class="marquee">
    <div class="maylike-products-container track">
      <HeadPhone v-for="product in productsList" :key="product.id" :item="product"/>
    </div>
  </div>
</div>
<PageFooter/>
</div>   
</template>

<script>
import { client, urlFor } from '../ecommercesanity/lib/client'
import getStripe from '../ecommercesanity/lib/getStripe';
export default { 
    name: 'ProductDetails',
    data(){
        return {
            imageIndex: 0,
            product: null,
            productsList: null,
        }
    },
    computed: {
      quantity(){
        return this.$store.state.qty
      }
    },
    methods: {
      urlFor,
      incQty(){
        this.$store.commit('changeQty',1);
      },
      decQty(){
        this.$store.commit('changeQty', -1);
      },
      onAdd(){
        this.$store.commit('onAdd', [this.product, this.quantity]);
      },
      async buyNow(){
        const url = 'https://stripe-server-nt.herokuapp.com/create-checkout-session';
        const items = this.$store.state.cartItems;
        const product = [items.find((item) => item._id === this.product._id),]; 
        const stripe = await getStripe();
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(product)
        });
        if(response.statusCode === 500) return;
        const data = await response.json();
        stripe.redirectToCheckout({ sessionId: data.id });
  }
    },
    async fetch(){ // Hook that execute automatically in nuxt script
       const slug = this.$route.params.ProductSlug;
       const singeProductQuery = `*[_type == 'product' && slug.current == '${slug}'][0]`
       const productsQuery = `*[_type == 'product' ]`;
       this.product = await client.fetch(singeProductQuery);
       this.productsList = await client.fetch(productsQuery);
       console.log(this.product);
    },
    fetchOnServer: false,
}

</script>
