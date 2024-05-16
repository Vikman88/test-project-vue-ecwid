import axios from "axios";

export default class ApiClient {
  static url = 'https://app.ecwid.com/api/v3/';
  static token = 'Bearer public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD';
  static storeId = '58958138';

  static getHeaders() {
    return {
      accept: 'application/json',
      Authorization: this.token,
    };
  }  

  static async getCategories() {
   return axios.get(`${this.url}${this.storeId}/categories`, {
      headers: this.getHeaders(),
    });
  }

  static async getCategory(idCategory: number) {
    return axios.get(`${this.url}${this.storeId}/categories/${idCategory}`, {
      headers: this.getHeaders(),
    });
  }

  static async searchProducts(idProducts: number[]) {
    return axios.get(`${this.url}${this.storeId}/products`, {
      headers: this.getHeaders(),
      params: {
        productId: idProducts.join(),
      }
    });
  }
  
  static async getProduct(idProduct: number) {
    return axios.get(`${this.url}${this.storeId}/products/${idProduct}`, {
      headers: this.getHeaders(),
    });
  }
}
