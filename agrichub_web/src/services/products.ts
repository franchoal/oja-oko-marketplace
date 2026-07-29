import { api } from "./api";

/* ==========================================
   Types
========================================== */

export interface ProductCategory {
  id: number;
  name: string;
}

export interface FarmerSummary {
  id: number;
  farm_name: string;
  location: string;
  is_verified: boolean;
}

export interface MarketplaceProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  quantity: number;
  unit: string;
  image: string | null;
  is_available: boolean;
  created_at: string;

  category: ProductCategory;
  farmer: FarmerSummary;
}

/* ==========================================
   Product Service
========================================== */

export const productsService = {
  /**
   * Fetch a single marketplace product.
   */
  async getProduct(id: number | string): Promise<MarketplaceProduct> {
    const response = await api.get<MarketplaceProduct>(
      `/products/${id}/`
    );

    return response.data;
  },
};