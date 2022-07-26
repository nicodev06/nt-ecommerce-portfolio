<template>
    <div class="hero-banner-container">
      <div>
        <p class="beats-solo">{{product.smallText}}</p>
        <h3>{{product.midText}}</h3>
        <h1>{{product.largeText1}}</h1>
        <img :src="urlFor(product.image)" alt="headphones" class="hero-banner-image" />
        <div>
        <button type="button">{{product.buttonText}}</button>
        <div class="desc">
            <h5>Description</h5>
            <p>{{product.desc}}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { urlFor } from '../ecommercesanity/lib/client'
export default {
    name: 'HeroBanner',
    props: {
      product: Object
    },
    methods: {
      urlFor
    },
}
</script>

<style scoped>
.hero-banner-container{
  padding: 100px 40px;
  background-color: #dcdcdc;
  border-radius: 15px;
  position: relative;
  height: 500px;
  line-height: 0.9; 
  width: 100%;

}
.hero-banner-container .beats-solo{
  font-size: 20px;
}
.hero-banner-container button{
   border-radius: 15px;
  padding: 10px 16px;
  background-color: #f02d34;
  color: white;
  border: none;
  margin-top: 40px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  z-index:10000 !important;
}

.hero-banner-container h3{
  font-size: 4rem;
  margin-top: 4px;
}
.hero-banner-container h1{
  color: white;
  font-size: 10em;
  margin-left: -20px;
  text-transform: uppercase;
}
.hero-banner-image{
  position: absolute;
  top: 0%;
  right:20%;
  width: 450px;
  height: 450px;
}


.desc{
position: absolute;
right: 10%;
bottom: 5%;
width: 300px;
line-height: 1.3;
display: flex;
flex-direction: column;
 color: #324d67;

}
.desc p{
  color: #5f5f5f;
  font-weight: 100;
text-align: end;
}
.desc h5{
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 16px;
  /* color: black; */
  align-self: flex-end;
}
</style>
