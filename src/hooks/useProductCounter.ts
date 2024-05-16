import { Ref, ref, watch } from 'vue';
import getLocalStorageItem from '@/utils/getLocalStorageItem';
import { useRouter } from 'vue-router';
import { Product, ProductsCart } from '@/types/Entities';

const useCountBtn = (currentProduct: Ref<Product>, productsCart: Ref<ProductsCart>) => {
  const cart = ref(getLocalStorageItem('cart', 0)) as Ref<number>;
  const router = useRouter()

  const incrDecrCounts = (id: number, caseExpr: 'incr' | 'decr') => {
    let items = { ...productsCart.value };
    let count = items[id] ?? 0;
    count += caseExpr === 'incr' ? 1 : -1;
    productsCart.value = { ...items, [id]: count };
  };

  const incrementCount = (item: Product) => {
    cart.value += item.price;
    incrDecrCounts(item.id, 'incr');
  };

  const decrementCount = (item: Product) => {
    cart.value -= item.price;
    incrDecrCounts(item.id, 'decr');
  };

  watch(productsCart, (newVal) => {
    localStorage.setItem('productsCart', JSON.stringify(newVal));
    const currentId = Number(router.currentRoute.value.params.id);
    currentProduct.value.count = newVal[currentId];
  });

  watch(cart, (newVal) => {
    localStorage.setItem('cart', JSON.stringify(newVal));
  });



  return {
    incrementCount,
    decrementCount,
    cart,
  };
};

export default useCountBtn;