<template>
  <div class="cart-widget">
    <p v-if="cartContentCount === 0">
      Cart is empty
    </p>
    <p v-else>
      Books in cart: {{ cartContentCount }}
    </p>
    <router-link
      :to="{ name: 'cart' }"
      tag="span"
    >
      Go to Cart
    </router-link>
  </div>
</template>

<script>
import { eventBus } from '../main';

export default {
  name: 'CartWidget',
  components: {
  },
  data() {
    return {
      cartContentCount: 0,
    };
  },
  created() {
    eventBus.$on('updateCart', (newCartContent) => {
      this.cartContentCount = newCartContent.length;
    });
  },
};
</script>

<style>
</style>
