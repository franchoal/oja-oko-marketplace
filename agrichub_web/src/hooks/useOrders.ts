import { useQuery } from "@tanstack/react-query";

import { orderService } from "../services/orderService";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],

    queryFn: orderService.getOrders,

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
  });
};