import { useQuery } from "@tanstack/react-query";

import { orderService } from "../services/orderService";

export const useFarmerOrders = () => {
  return useQuery({
    queryKey: ["farmer-orders"],

    queryFn: orderService.getFarmerOrders,

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
  });
};