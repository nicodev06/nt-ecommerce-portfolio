<template>
    <NuxtLink :to="item.slug.current">
    <div>
        <div class="product-card">
            <img :src="urlFor(item.image[0])"
                    width="250"
                    height="250"
                    class="product-image">
        </div>
        <p class="product-name">{{item.name}}</p>
        <p class="product-price">{{item.price}}$</p>
    </div>
    </NuxtLink>
</template>

<script>
import { urlFor } from '../ecommercesanity/lib/client'
export default {
    name: 'HeadPhone',
    props: {
        item: Object
    },
    methods: {
        urlFor
    }
}
</script>
