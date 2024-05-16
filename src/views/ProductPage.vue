<template>
  <div class="loader-container" v-if="loader">
    <div class="loader" ></div>
  </div>
  <div class="content-container" v-else>
    <nav-bar
      :cart="cart"
    />
    <div class="item-card-wrapper">
      <div class="item-card-img">
        <img :src="currentProduct.thumbnailUrl" :alt="currentProduct.name">
      </div>
      <div class="item-card-content">
        <div class="item-card-container">
          <div class="item-card-title">{{currentProduct.name}}</div>
          <div class="item-card-dscr" v-html="currentProduct.description"></div>
        </div>
        <div class="item-card-bottom" @click.stop>
          <div class="item-card-price" @click.stop>
            {{currentProduct.price}} ₽
          </div>
          <div class="item-btn">
            <toggle-theme-btn
              :item="currentProduct"
              :incrementCount="incrementCount"
              :decrementCount="decrementCount"
            />
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ToggleThemeBtn from '@/components/ToggleThemeBtn.vue';
import NavBar from '@/components/NavBar.vue';
import hooks from '@/hooks';

export default defineComponent({
  name: 'ProductsPage',

  components: {
    ToggleThemeBtn,
    NavBar
  },

  setup() {
    const { useFetchProduct, useProductCounter } = hooks;
    const loader = ref(true);
    const { currentProduct, productsCart } = useFetchProduct(loader);
    const { incrementCount, decrementCount, cart } = useProductCounter(currentProduct, productsCart);
    return { currentProduct, productsCart, cart, loader, incrementCount, decrementCount };
  },
})
</script>

<style scoped>
.content-container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  margin-top: 8rem;
}
.item-card-wrapper {
  display: flex;
  height: 100%;
  background: linear-gradient(360deg, #F5F5F9 0%, rgba(245, 245, 249, 0) 60%);
  border-radius: 1.8rem;
  padding-bottom: 2rem;
}
.item-card-img {
  width: 70rem;
  overflow: hidden;
}
.item-card-img img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.item-card-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 2rem 2rem;
  justify-content: space-between;
}
.item-card-title {
  margin: 0 0 1.7rem;
  font-size: 2rem;
  line-height: 1.2;
  color: #1a1a1a;
}
.item-card-dscr {
  flex-grow: 1;
  margin: 0 0 .7rem;
  font-size: 1.3rem;
}
.item-card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.item-card-price {
  color: #1a1a1a;
  font-size: 2rem;
}
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
}
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid;
  border-color: #252525 #0000;
  animation: l1 1s infinite;
}
@keyframes l1 {to{transform: rotate(.5turn)}}
</style>