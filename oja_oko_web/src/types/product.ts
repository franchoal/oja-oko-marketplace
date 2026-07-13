export interface Product {
  id: number;

  farmer: string;

  category: number;

  category_name: string;

  name: string;

  description: string;

  price: string;

  quantity: number;

  unit: string;

  image: string | null;

  is_available: boolean;

  created_at: string;

  updated_at: string;
}

/**
 * Product details use exactly
 * the same structure.
 */
export type ProductDetail = Product;

export interface CreateProductData {
  category: number;

  name: string;

  description: string;

  price: number;

  quantity: number;

  unit: string;

  image?: File | null;
}