<template>
  <div class="loader-container" v-if="loader">
    <div class="loader" ></div>
  </div>
  <div class="content-container">
    <nav-bar
      :cart="cart"
    />
    <div class="title-container">
      <div class="content-title">
        Корзина
      </div>
      <div class="title-btn">
        <my-button @click="checkout">
          Оформить заказ
        </my-button>
        <my-button @click="clearCart">
          <img src="../assets/image/trash.svg" alt="trash">
        </my-button>
      </div>
    </div>
    <hr/>
    <cart-list
      v-if="filteredProducts.length"
      :products="filteredProducts"
      :incrementCount="incrementCount"
      :decrementCount="decrementCount"
    />
    <div class="empty-cart-title" v-else>
      Корзина пуста
    </div>
  </div>
  <my-dialog
    v-model:show="dialogVisible"
  >
    <div class="dialog-title">
      Спасибо за покупку!
    </div>
    <my-button @click="dialogVisible = false">
      Закрыть
    </my-button>
  </my-dialog>
</template>

<script lang="ts">
import CartList from '@/components/CartList.vue';
import { defineComponent, ref } from 'vue'
import NavBar from '@/components/NavBar.vue';
import hooks from '@/hooks';
import { Product } from '@/types/Entities';

interface State {
  dialogVisible: boolean;
}

export default defineComponent({
  name: 'CartPage',
  components: { CartList, NavBar },

  data(): State {

    return {
      dialogVisible: false,
    };
  },

  setup() {
    const { useFetchSearchProducts, useProductsCounter } = hooks
    const loader = ref(true)
    const { products, productsCart } = useFetchSearchProducts(loader);
    const { incrementCount, decrementCount, cart } = useProductsCounter(products, productsCart);
    return { products, productsCart, cart, loader, incrementCount, decrementCount };
  },

  methods: {
    clearCart() {
      this.productsCart = {};
      this.products = [];
      this.cart = 0;
    },

    checkout() {
      if (!this.products.length) return;
      this.clearCart();
      this.dialogVisible = true;
    },
  },

  computed: {
    filteredProducts(): Product[] {
      if (!this.products.length) return [];
      return this.products.filter((product: Product) => product.count !== 0);
    }
  },
})
</script>

<style scoped>
.title-container {
  display: flex;
  justify-content: space-between;
}
.content-container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  margin-top: 8rem;
}
.content-title,
.empty-cart-title {
  font-size: 2.2rem;
  margin: 0 0 1rem;
  color: #1a1a1a;
  font-weight: 700;
}
.empty-cart-title {
  margin-top: 2rem;
  font-size: 1.8rem
}
.title-btn {
  display: flex;
  align-items: center;
}
.title-btn >*:last-child {
  margin-left: 1rem;
}
.dialog-title {
  margin-bottom: 2rem;
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