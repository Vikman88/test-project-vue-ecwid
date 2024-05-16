import { ref, onMounted, Ref } from 'vue';
import ApiClient from '@/api/ApiClient';
import getLocalStorageItem from '@/utils/getLocalStorageItem';
import { Product, ProductsCart } from '@/types/Entities';


const useSearchProductsForCart = (loader: Ref<boolean>) => {
  const productsCartLocalSt = getLocalStorageItem('productsCart', {});

  const products = ref([]) as Ref<Product[]>
  const productsCart = ref(productsCartLocalSt) as Ref<ProductsCart>

  const fetchProducts = async () => {
      try {
      const ids = Object.keys(productsCart.value).map(Number);

      if (!ids.length) return;

      loader.value = true;
  
      const response = await ApiClient.searchProducts(ids);
      products.value = response.data.items.map((item: Product) => {
        const { name, description, thumbnailUrl, price, id } = item;
        return { name, description, thumbnailUrl, price, id, count: productsCart.value[id] ?? 0 };
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      loader.value = false;
    }
  };

  onMounted(fetchProducts);

  return {
    products,
    productsCart,
    loader
  };
};

export default useSearchProductsForCart;
