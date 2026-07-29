import { api } from "./api";

export interface Review {
  id: number;
  buyer: string;
  product: number;
  product_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface CreateReviewData {
  product: number;
  rating: number;
  comment: string;
}

export const reviewService = {
  /**
   * Reviews for a product
   */
  getReviews: async (
    productId: number
  ): Promise<Review[]> => {
    const response = await api.get<Review[]>(
      `/reviews/products/${productId}/`
    );

    return response.data;
  },

  /**
   * Create review
   */
  createReview: async (
    data: CreateReviewData
  ): Promise<Review> => {
    const response = await api.post<Review>(
      "/reviews/",
      data
    );

    return response.data;
  },
};