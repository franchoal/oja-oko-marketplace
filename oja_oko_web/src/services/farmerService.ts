import { api } from "./api";

/* ==============================
   Farmer Profile Types
============================== */

export interface FarmerProfile {
  id: number;
  farm_name: string;
  farm_location: string;
  farm_description: string;
  is_verified: boolean;
}

/* ==============================
   Product Types
============================== */

export interface FarmerProduct {
  id: number;
  category: number;
  category_name: string;
  name: string;
  description: string;
  price: string;
  quantity: number;
  unit: string;
  image: string | null;
  is_available: boolean;
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

export interface UpdateFarmerProductData {
  category?: number;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  unit?: string;
  image?: File | null;
}

/* ==============================
   Farmer Service
============================== */

export const farmerService = {
  /**
   * ==============================
   * Farmer Profile
   * ==============================
   */

  getProfile: async (): Promise<FarmerProfile> => {
    const response = await api.get("/farmers/profile/");
    return response.data;
  },

  createProfile: async (
    data: Omit<FarmerProfile, "id" | "is_verified">
  ) => {
    const response = await api.post(
      "/farmers/profile/create/",
      data
    );

    return response.data;
  },

  updateProfile: async (
    data: Omit<FarmerProfile, "id" | "is_verified">
  ) => {
    const response = await api.put(
      "/farmers/profile/",
      data
    );

    return response.data;
  },

  /**
   * ==============================
   * Farmer Products
   * ==============================
   */

  getMyProducts: async (): Promise<FarmerProduct[]> => {
    const response = await api.get(
      "/farmers/products/"
    );

    return response.data;
  },

  getProduct: async (
    id: number
  ): Promise<FarmerProduct> => {
    const response = await api.get(
      `/farmers/products/${id}/`
    );

    return response.data;
  },

  createProduct: async (
    data: CreateFarmerProductData
  ) => {
    const formData = new FormData();

    formData.append(
      "category",
      String(data.category)
    );

    formData.append(
      "name",
      data.name
    );

    formData.append(
      "description",
      data.description
    );

    formData.append(
      "price",
      String(data.price)
    );

    formData.append(
      "quantity",
      String(data.quantity)
    );

    formData.append(
      "unit",
      data.unit
    );

    if (data.image instanceof File) {
      formData.append(
        "image",
        data.image,
        data.image.name
      );
    }

    const response = await api.post(
      "/farmers/products/",
      formData
    );

    return response.data;
  },

  updateProduct: async (
    id: number,
    data: UpdateFarmerProductData
  ) => {
    const formData = new FormData();

    if (data.category !== undefined) {
      formData.append(
        "category",
        String(data.category)
      );
    }

    if (data.name !== undefined) {
      formData.append(
        "name",
        data.name
      );
    }

    if (data.description !== undefined) {
      formData.append(
        "description",
        data.description
      );
    }

    if (data.price !== undefined) {
      formData.append(
        "price",
        String(data.price)
      );
    }

    if (data.quantity !== undefined) {
      formData.append(
        "quantity",
        String(data.quantity)
      );
    }

    if (data.unit !== undefined) {
      formData.append(
        "unit",
        data.unit
      );
    }

    if (data.image instanceof File) {
      formData.append(
        "image",
        data.image,
        data.image.name
      );
    }

    const response = await api.patch(
      `/farmers/products/${id}/`,
      formData
    );

    return response.data;
  },

  deleteProduct: async (
    id: number
  ) => {
    await api.delete(
      `/farmers/products/${id}/`
    );
  },
};