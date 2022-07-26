<template>
<div id="app">
    <NavBar/>
    <div class="success-wrapper">
        <div class="success">
            <p class="icon">
                <i class="pi pi-shopping-bag"></i>
            </p>
            <h2>Thank you for your order!</h2>
            <p class="email-msg">Check your email inboxe for the receive </p>
            <p class="description">
                If you have any questions please email
                <a href="mailto:teseonicolo@gmail.com " class="email">teseonicolo@gmail.com</a>
                <NuxtLink to="/">
                    <button
                    type="button"
                    width="300px" 
                    class="btn">
                    Continue Shopping
                    </button>
                </NuxtLink> 
            </p>
        </div>
    </div>
    <PageFooter/>    
</div>    
</template>

<script>
import { runFireworks } from '../ecommercesanity/lib/utils';
export default {
    name: 'transitionSuccess',
    mounted() {
        runFireworks();
    }
}
</script>
