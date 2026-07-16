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

export interface UpdateOrderStatusData {
  status:
    | "accepted"
    | "processing"
    | "ready"
    | "out_for_delivery"
    | "delivered"
    | "completed"
    | "cancelled";
}

export const orderService = {
  /*
  ==========================================
  BUYER
  ==========================================
  */

  checkout: async (data: CheckoutData) => {
    const response = await api.post(
      "/orders/checkout/",
      data
    );

    return response.data;
  },

  getOrders: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>(
      "/orders/"
    );

    return response.data;
  },

  getOrder: async (
    id: number
  ): Promise<Order> => {
    const response = await api.get<Order>(
      `/orders/${id}/`
    );

    return response.data;
  },

  /*
  ==========================================
  FARMER
  ==========================================
  */

  getFarmerOrders: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>(
      "/orders/farmer/"
    );

    return response.data;
  },

  getFarmerOrder: async (
    id: number
  ): Promise<Order> => {
    const response = await api.get<Order>(
      `/orders/farmer/${id}/`
    );

    return response.data;
  },

  updateFarmerOrderStatus: async (
    id: number,
    data: UpdateOrderStatusData
  ): Promise<Order> => {
    const response = await api.patch<Order>(
      `/orders/farmer/${id}/`,
      data
    );

    return response.data;
  },
};