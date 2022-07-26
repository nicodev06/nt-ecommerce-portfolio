<template>
    <div>
        <div class="footer-banner-container">
      <div class="banner-desc">
        <div class="left">
          <p>{{product.discount}} OFF</p>
          <h3>{{product.largeText1}}</h3>
          <h3>{{product.largeText2}}</h3>
          <p>{{product.saleTime}}</p>
        </div>
        <div class="right">
          <p>{{product.smallText}}</p>
          <h3>{{product.midText}}</h3>
          <p>{{product.desc}}</p>
          <button type="button">{{product.buttonText}}</button>
        </div>
        <img 
          :src="urlFor(product.image)" class="footer-banner-image"
        />
      </div>
    </div>
    </div>
</template>

<script>
import { urlFor } from '../ecommercesanity/lib/client'
export default {
    name: 'BottomFooter',
    props: {
        product: Object
    },
    methods: {
       urlFor
    }
}
</script>
