export interface FarmerProfile {
  id: number;
  farm_name: string;
  farm_location: string;
  farm_description: string;
  is_verified: boolean;
}

export interface FarmerProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  quantity: number;
  unit: string;
  image: string | null;
  is_available: boolean;
  category_name: string;
}

export interface CreateFarmerProductData {
  category: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  image?: File | null;
}