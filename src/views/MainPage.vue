<template>
  <div class="loader-container" v-if="loader">
    <div class="loader" ></div>
  </div>
  <div class="content-container" v-else>
    <nav-bar
      :cart="cart"
      @toMain="listType = 'category'"
    />
    <items-list
      :categoryName
    >
      <my-item-card
        v-for="item in toggledTypeItems"
        :item
        :id="item.id"
        :key="item.id"
        @click="getItem(item)"
      >
        <template v-if="listType === 'product'">
          <div class="item-card-price" @click.stop>
            {{item.price}} ₽
          </div>
          <toggle-theme-btn
            :item
            :incrementCount="incrementCount"
            :decrementCount="decrementCount"
          />
        </template>
      </my-item-card>
    </items-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ItemsList from '@/components/ItemsList.vue';
import ToggleThemeBtn from '@/components/ToggleThemeBtn.vue';
import NavBar from '@/components/NavBar.vue';
import hooks from '@/hooks';
import { Product, Category, Subcategory } from '@/types/Entities';

interface State {
  categoryName: string;
  parentId: number;
}

export default defineComponent({
  name: 'MainPage',
  components: {
    ItemsList,
    ToggleThemeBtn,
    NavBar
  },

  data(): State {

    return {
      categoryName: 'Категории',
      parentId: 0,
    }
  },

  setup() {
    const { useGetCategories, useFetchProducts, useProductsCounter } = hooks;
    const listType = ref('category')
    const loader = ref(true)
    const { categories, subCategories } = useGetCategories(loader);
    const { products, productsCart, fetchProducts } = useFetchProducts(loader, listType);
    const { incrementCount, decrementCount, cart } = useProductsCounter(products, productsCart);
    return {
      loader,
      categories,
      subCategories,
      products,
      cart,
      listType,
      incrementCount,
      decrementCount,
      fetchProducts
    };
  },

  computed: {
    toggledTypeItems(): Category[] | Subcategory[] | Product[] | [] {
      switch (this.listType) {
        case 'category':
          return this.categories;
        case 'subcategory':
          return this.getSubcategories;
        case 'product':
          return this.products;
        default:
          return [];
      }
    },

    getSubcategories(): Subcategory[] | [] {
      return this.subCategories.filter(({ parentId }) => parentId === this.parentId);
    }
  },

  methods: {
    getItem({ id, name }: { id: number; name: string; }) {
      this.categoryName = name;
      switch(this.listType) {
        case 'category':
          this.getSubcategory(id);
          break;
        case 'subcategory':
          this.fetchProducts(id);
          break;
        case 'product':
          this.getProduct(id);
          break;
        default:
          throw new Error('Wrong type of list');
      }
    },

    getSubcategory(id: number) {
      const subCategory: Subcategory | {} = this.subCategories.find((subcategory) => subcategory.parentId === id) ?? {};
      if ('parentId' in subCategory) {
        this.parentId = subCategory.parentId;
        this.listType = 'subcategory';
      } else {
        this.fetchProducts(id);
      }
    },

    getProduct(id: number) {
      this.$router.push(`/products/${id}`);
    },
  },

  watch: {
    listType() {
      if (this.listType === 'category') this.categoryName = 'Категории';
    }
  },
});
</script>

<style scoped>
.content-container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  margin-top: 8rem;
}
.item-card-price {
  font-size: 1.3rem;
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
