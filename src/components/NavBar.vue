<template>
  <div class="navbar-content">
    <my-button class="cart-button" @click="toMain">
      На главную
    </my-button>
    <div class="cart-container">
      <my-button class="cart-button" @click="toCart">
        <img alt="cart" src="../assets/image/cart.svg"></img>
        <span>{{cart}} ₽</span>
      </my-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NavBar',

  props: {
    cart: {
      type: Number,
      required: true,
    }
  },

  methods: {
    toMain() {
      this.$router.push('/');
      this.$emit('toMain');
    },

    toCart() {
      this.$router.push('/cart');
    }
  }
})
</script>

<style scoped>
  .navbar-content {
    height: 5rem;
    background-color: #fff;
    box-shadow: 0 4px 10px 0 gainsboro;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 14rem;
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    z-index: 1000;
  }
  .logo-container {
    max-width: 5rem;
    cursor: pointer;
  }
  .logo-container img {
    max-width: 100%;
    height: auto;
  }
  .cart-container {
    min-width: 130px;
  }
  .cart-button span {
    margin-left: 0.5rem;
    font-size: 1rem;
  }
</style>