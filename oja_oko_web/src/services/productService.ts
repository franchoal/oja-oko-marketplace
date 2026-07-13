import { publicApi } from "./publicApi";

import type { Category } from "../types/category";
import type { Product } from "../types/product";

export const productService = {
  /**
   * ==========================================
   * PUBLIC MARKETPLACE
   * ==========================================
   */

  getCategories: async (): Promise<Category[]> => {
    const response = await publicApi.get(
      "/products/categories/"
    );

    return response.data;
  },

  getProducts: async (): Promise<Product[]> => {
    const response = await publicApi.get(
      "/products/"
    );

    return response.data;
  },

  getProduct: async (
    id: number
  ): Promise<Product> => {
    const response = await publicApi.get(
      `/products/${id}/`
    );

    return response.data;
  },
};