<template>
  <div class="app">
    <header>
      <NavBar/>
    </header>
    <main class="main-container">
      <HeroBanner :product="heroBan[0]" v-if="heroBan"/>
      <div class="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many Variations</p>
      </div>
      <div class="products-container">
        <div v-for="product in products" :key="product.id">
          <HeadPhone :item="product"/>
        </div>
      </div>
      <BottomFooter :product="heroBan[0]"/> 
    </main>
    <footer>
      <PageFooter/>
    </footer>
  </div>
</template>

<script>
import {client} from '../ecommercesanity/lib/client'
export default {
  name: 'IndexPage',
  data() {
    return {
      heroBan: null,
      products: null
    }
  },
  async fetch(){
    this.heroBan = await client.fetch("*[_type == 'banner' ]");
    this.products = await client.fetch("*[_type == 'product' ]");
  },
  fetchOnServer: true,
}
</script>
