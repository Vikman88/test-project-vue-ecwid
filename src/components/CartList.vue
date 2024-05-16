<template>
  <div class="items-list">
    <transition-group name="cart">
      <div class="item-cart"
        v-for="(product, index) in products"
        :item="product"
        :id="product.id"
        :key="product.id"
      >
        <div class="item-content-container">
          <div class="item-img-container">
            <img :src="product.thumbnailUrl" :alt="product.name">
          </div>
          <div class="item-block">
            <div class="item-title">{{product.name}}</div>
            <div class="item-price">{{product.price}} ₽</div>
          </div>
        </div>
        <div class="item-btn">
          <toggle-theme-btn
            :item="product"
            :incrementCount="incrementCount"
            :decrementCount="decrementCount"
          />
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ToggleThemeBtn from './ToggleThemeBtn.vue';
import { Product } from '@/types/Entities';
export default defineComponent({
  components: { ToggleThemeBtn },
  name: 'CartList',

  props: {
    products: {
      type: Array as PropType<Product[]>,
      default: () => [],
    },
    incrementCount: {
      type: Function,
      required: true,
    },
    decrementCount: {
      type: Function,
      required: true,
    }
  }
})
</script>

<style scoped>
  .content-title {
    font-size: 2.2rem;
    margin: 0 0 1rem;
    color: #1a1a1a;
    font-weight: 700;
  }
  .item-img-container {
    width: 100px;
    height: 100px;
    overflow: hidden;
  }
  .item-img-container img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  .items-list {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
  }
  .item-cart {
    width: 100%;
    display: flex;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
    justify-content: space-between;
  }
  .item-cart:not(:last-child) {
    border-bottom: .1rem solid #E2E3E8;
  }
  .item-content-container {
    display: flex;
  }
  .item-block {
    margin-left: 2rem;
  }
  .item-title {
    margin: 0 0 1.7rem;
    font-size: 2rem;
    line-height: 1.2;
    color: #1a1a1a;
  }
  .item-price {
    font-size: 1.3rem;
  }
  .item-btn {
    align-content: center;
  }
  .cart-enter-active,
  .cart-leave-active {
    transition: all 0.5s ease;
  }
  .cart-enter-from,
  .cart-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>