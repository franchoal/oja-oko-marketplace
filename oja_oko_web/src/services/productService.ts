import { publicApi } from "./publicApi";

import type { Category } from "../types/category";
import type {
  Product,
  ProductDetail,
} from "../types/product";

export const productService = {
  /**
   * ==========================================
   * PUBLIC MARKETPLACE
   * ==========================================
   */

  /**
   * Get all marketplace categories.
   */
  getCategories: async (): Promise<Category[]> => {
    const response = await publicApi.get<Category[]>(
      "/products/categories/"
    );

    return response.data;
  },

  /**
   * Get all publicly available marketplace products.
   */
  getProducts: async (): Promise<Product[]> => {
    const response = await publicApi.get<Product[]>(
      "/products/"
    );

    return response.data;
  },

  /**
   * Get a single marketplace product.
   */
  getProduct: async (
    id: number
  ): Promise<ProductDetail> => {
    const response = await publicApi.get<ProductDetail>(
      `/products/${id}/`
    );

    return response.data;
  },
};