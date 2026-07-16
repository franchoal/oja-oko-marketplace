import { useQuery } from "@tanstack/react-query";

import {
  orderService,
  type Order,
} from "../services/orderService";

export const useFarmerOrders = () => {
  return useQuery<Order[]>({
    queryKey: ["farmer-orders"],

    queryFn: orderService.getFarmerOrders,

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
  });
};