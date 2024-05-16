export interface Product {
  id: number;
  name: string;
  description: string;
  thumbnailUrl: string;
  price: number;
  count: number;
}

export interface Category {
  name: string;
  thumbnailUrl: string;
  id: number;
}

export interface Subcategory extends Category {
  parentId: number;
}

export type ProductsCart = {
  [key: string]: number;
};