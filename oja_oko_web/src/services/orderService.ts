import { api } from "./api";

export interface CheckoutData {
  delivery_address: string;
  payment_method: "card" | "bank_transfer";
}

export interface OrderItem {
  id: number;
  product: number;
  product_name: string;
  quantity: number;
  price: string;
  subtotal: string;
}

export interface Order {
  id: number;
  buyer: string;
  farmer: string;
  status: string;
  total: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export const orderService = {
  /**
   * Buyer Checkout
   */
  checkout: async (data: CheckoutData) => {
    const response = await api.post(
      "/orders/checkout/",
      data
    );

    return response.data;
  },

  /**
   * Buyer Orders
   */
  getOrders: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>(
      "/orders/"
    );

    return response.data;
  },

  /**
   * Order Details
   */
  getOrder: async (
    id: number
  ): Promise<Order> => {
    const response = await api.get<Order>(
      `/orders/${id}/`
    );

    return response.data;
  },
};