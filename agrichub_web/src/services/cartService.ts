import { api } from "./api";

import type {
  Cart,
  AddToCartData,
  UpdateCartItemData,
} from "../types/cart";


export const cartService = {

  /**
   * Get current buyer cart
   */
  getCart: async (): Promise<Cart> => {
    const response = await api.get<Cart>(
      "/cart/"
    );

    return response.data;
  },


  /**
   * Add product to cart
   */
  addToCart: async (
    data: AddToCartData
  ): Promise<void> => {

    await api.post(
      "/cart/items/",
      data
    );

  },


  /**
   * Update cart item quantity
   */
  updateCartItem: async (
    id: number,
    data: UpdateCartItemData
  ): Promise<void> => {

    await api.patch(
      `/cart/items/${id}/`,
      data
    );

  },


  /**
   * Remove item from cart
   */
  removeCartItem: async (
    id: number
  ): Promise<void> => {

    await api.delete(
      `/cart/items/${id}/delete/`
    );

  },

};