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
    data: Omit<
      FarmerProfile,
      "id" | "is_verified"
    >
  ) => {
    const response = await api.post(
      "/farmers/profile/create/",
      data
    );

    return response.data;
  },

  updateProfile: async (
    data: Omit<
      FarmerProfile,
      "id" | "is_verified"
    >
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

  getMyProducts: async (): Promise<
    FarmerProduct[]
  > => {
    const response = await api.get(
      "/farmers/products/"
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

    /**
     * Append image only if
     * a valid File object exists.
     */

    if (
      data.image instanceof File
    ) {
      formData.append(
        "image",
        data.image,
        data.image.name
      );
    }

    /**
     * Debug FormData
     */

    console.group(
      "CREATE PRODUCT FORMDATA"
    );

    for (const [
      key,
      value,
    ] of formData.entries()) {
      console.log(key, value);
    }

    console.groupEnd();

    /**
     * IMPORTANT:
     *
     * Do NOT manually set
     * Content-Type.
     *
     * Axios/browser will automatically
     * generate:
     *
     * multipart/form-data;
     * boundary=----------
     */

    const response = await api.post(
      "/farmers/products/",
      formData
    );

    return response.data;
  },
};