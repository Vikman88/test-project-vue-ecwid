import { Ref, ref, watch } from 'vue';
import getLocalStorageItem from '@/utils/getLocalStorageItem';
import { Product, ProductsCart } from '@/types/Entities';


const useCountBtn = (products: Ref<Product[]>, productsCart: Ref<ProductsCart>) => {
  const cart = ref(getLocalStorageItem('cart', 0)) as Ref<number>;

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
      products.value = products.value.map((product: Product) => {
        const { id } = product;
        return { ...product, count: newVal[id] ?? 0 };
      })
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