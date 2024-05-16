import { Ref, ref } from 'vue';
import ApiClient from '@/api/ApiClient';
import getLocalStorageItem from '@/utils/getLocalStorageItem';
import { Product, ProductsCart } from '@/types/Entities';


const useFetchProductsForCart = (loader: Ref<boolean>, listType: Ref<string>) => {
  const productsCartLocalSt = getLocalStorageItem('productsCart', {});

  const products = ref([]) as Ref<Product[]>
  const productsCart = ref(productsCartLocalSt) as Ref<ProductsCart>
  

  const fetchProducts = async (productId: number) => {
    loader.value = true;
    
    try {
      const response = await ApiClient.getCategory(productId);
      const { productIds } = response.data;

      if (productIds.length) {
        const productsResponse = await ApiClient.searchProducts(productIds);

        products.value = productsResponse.data.items.map((item: Product) => {
          const { name, description, thumbnailUrl, price, id } = item;
          return { name, description, thumbnailUrl, price, id, count: productsCart.value[id] ?? 0 };
        });

        loader.value = false;

        if (products.value.length) {
          listType.value = 'product';
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      loader.value = false;
    }
  };

  return {
    products,
    productsCart,
    fetchProducts
  };
};

export default useFetchProductsForCart;
