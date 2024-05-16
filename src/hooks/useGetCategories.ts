import { ref, onMounted, Ref } from 'vue';
import ApiClient from '@/api/ApiClient';
import { Category, Subcategory } from '@/types/Entities';


const useGetCategories = (loader: Ref<boolean>) => {

  const categories = ref([]) as Ref<Category[]>
  const subCategories = ref([]) as Ref<Subcategory[]>

  const getCategories = async () => {
    loader.value = true;
    try {
      const response = await ApiClient.getCategories();
      response.data.items.forEach((item: Category | Subcategory) => {
        const { name, thumbnailUrl, id } = item;
        if ('parentId' in item) {
          const { parentId } = item;
          subCategories.value.push({ name, thumbnailUrl, id, parentId });
        } else {
          categories.value.push({ name, thumbnailUrl, id });
        }
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      loader.value = false;
    }
  }

  onMounted(getCategories);

  return {
    categories,
    subCategories,
  };
}

export default useGetCategories;