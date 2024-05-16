import { ref, onMounted, Ref } from 'vue';
import ApiClient from '@/api/ApiClient';
import getLocalStorageItem from '@/utils/getLocalStorageItem';
import { useRouter } from 'vue-router';
import { Product, ProductsCart } from '@/types/Entities';


const useFetchProduct = (loader: Ref<boolean>) => {
  const productsCartLocalSt = getLocalStorageItem('productsCart', {});

  const currentProduct = ref({}) as Ref<Product>
  const productsCart = ref(productsCartLocalSt) as Ref<ProductsCart>
  const router = useRouter()

  const fetchProduct = async () => {
    try {
      loader.value = true;
      const currentId = Number(router.currentRoute.value.params.id);
      const response = await ApiClient.getProduct(currentId);
      const { name, description, thumbnailUrl, price, id } = response.data;
      currentProduct.value = { name, description, thumbnailUrl, price, id, count: productsCart.value[currentId] ?? 0 };
      loader.value = false;
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      loader.value = false;
    }
  };

  onMounted(fetchProduct);

  return {
    currentProduct,
    productsCart,
    loader
  };
};

export default useFetchProduct;
