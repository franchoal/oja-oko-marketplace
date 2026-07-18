import { publicApi } from "./publicApi";

import type { Category } from "../types/category";
import type {
  Product,
  ProductDetail,
} from "../types/product";


/* ==========================================
   Product Filters
========================================== */

export interface ProductFilters {

  search?: string;

  category?: number;

  ordering?: string;

  price__gte?: number;

  price__lte?: number;

  is_available?: boolean;

  page?: number;

  page_size?: number;

}


/* ==========================================
   Paginated Products Response
========================================== */

export interface PaginatedProducts {

  count: number;

  next: string | null;

  previous: string | null;

  results: Product[];

}


/* ==========================================
   Product Service
========================================== */

export const productService = {


  /**
   * Get marketplace categories
   */
  getCategories:
  async (): Promise<Category[]> => {

    const response =
      await publicApi.get<Category[]>(
        "/products/categories/"
      );

    return response.data;

  },


  /**
   * Get marketplace products
   *
   * Supports:
   * - Search
   * - Category filtering
   * - Price filtering
   * - Ordering
   * - Pagination
   */
  getProducts:
  async (
    filters?: ProductFilters
  ): Promise<PaginatedProducts> => {


    const response =
      await publicApi.get<PaginatedProducts>(
        "/products/",
        {
          params: {

            search:
              filters?.search || undefined,


            category:
              filters?.category || undefined,


            ordering:
              filters?.ordering || undefined,


            price__gte:
              filters?.price__gte,


            price__lte:
              filters?.price__lte,


            is_available:
              filters?.is_available,


            page:
              filters?.page || 1,


            page_size:
              filters?.page_size || 12,

          },
        }
      );


    return response.data;

  },


  /**
   * Get single product details
   */
  getProduct:
  async (
    id: number
  ): Promise<ProductDetail> => {


    const response =
      await publicApi.get<ProductDetail>(
        `/products/${id}/`
      );


    return response.data;

  },


};